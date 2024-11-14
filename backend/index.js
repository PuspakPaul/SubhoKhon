const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const jwt = require('jsonwebtoken');
const port = process.env.port || 5000;

//middleware

app.use(cors());
app.use(express.json())
// set token
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
      return res.status(401).send({ error: true, message: 'Unauthorize access' })
  }
  const token = authorization?.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send({ error: true, message: 'forbidden user or token has expired' })
      }
      req.decoded = decoded;
      next()
  })
}

//mongpdb connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cupid.hwqcntp.mongodb.net/?retryWrites=true&w=majority&appName=cupid`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    // create database and collection
    const database = client.db("event-management");
    const usersCollection = database.collection("users");
    const eventsCollection = database.collection("events");
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payment");
    const packagesCollection = database.collection("packages");
    const bookedCollection = database.collection("booked");
    //const selectedCollection = database.collection("selected");
    client.connect();
    
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user.role === 'admin') {
        next()
      }
      else {
        return res.status(401).send({ error: true, message: 'Unauthorize access' })
      }
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.ADMIN_MAIL, // Your email address
          pass: process.env.ADMIN_PASSWORD // Your email password
      }
  });

  const generateRandomDate = () => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
};
  

    const sendPaymentConfirmationEmail = (userMail, paymentInfo) => {
      const randomDate = generateRandomDate();
    const formattedDate = randomDate.toLocaleString();
      const mailOptions = {
          from: process.env.ADMIN_MAIL,
          to: userMail,
          subject: 'Payment Confirmation',
          text: `Dear user,
  
  Thank you for your payment. Here are your payment details:
  
  Transaction ID: ${paymentInfo.transactionId}
  Payment Method: ${paymentInfo.paymentMethod}
  Amount: ${paymentInfo.amount}
  Currency: ${paymentInfo.currency}
  Payment Status: ${paymentInfo.paymentStatus}
  Date: ${paymentInfo.date}

  For further discussion, please join the below meeting at: ${formattedDate}
  Meeting link: https://meet.google.com/nxe-iuaj-qfu
  We appreciate your business.
  
  Best regards,
  SubhoKhon`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  };
    // routes for user
    app.post('/new-user', async (req, res) => {
      const newUser = req.body;

      const result = await usersCollection.insertOne(newUser);
      res.send(result);
  })
  app.post('/api/set-token', (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '24h' })
    res.send({ token })
  })

    // get all user
    app.get('/users', async (req, res) => {
      const users = await usersCollection.find({}).toArray();
      res.send(users);
  })

    // get user  by  Id
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
  })
    // get user by email
    app.get('/user/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
  })
    // Delete an User
    app.delete('/delete-user/:id', verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
  })
   // update User
   app.put('/update-user/:id',verifyJWT, verifyAdmin, async (req,res) => {
    const id =  req.params.id;
    const updatedUser = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.option,
            address: updatedUser.address,
            phone: updatedUser.phone
        }
      }
      const result = await usersCollection.updateOne(filter, updateDoc, options);
        res.send(result);
   })


    // events routes here
    app.post('/new-event', verifyJWT, verifyAdmin, async (req,res) => {
      const newEvent = req.body;
      //newClass.availableDates = parseInt(newClass.availableDates);
      const result = await eventsCollection.insertOne(newEvent);
      res.send(result);

    })

    app.get('/events', async(req, res) => {
      const query = { status: "Available" };
      const  result = await eventsCollection.find(query).toArray();
      res.send(result);
    })

    // get events  by venue
    
    app.get('/events/:venue', async(req, res) => {
      const  venue = req.params.venue;
      const query  = {suggestedVenue: venue};
      const result = await eventsCollection.find(query).toArray();
      res.send(result); 
    })

    // manage events
    app.get('/events-manage', async(req, res) => {
      //const query = { status: "Available" };
      const  result = await eventsCollection.find().toArray();
      res.send(result);
    })

    // update events
    app.patch('/change-status/:id',verifyJWT, verifyAdmin, async (req,res) => {
      const id = req.params.id;
      const status = req.body.status;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      const result = await eventsCollection.updateOne(filter,updateDoc,options);
      res.send(result);
    })

    // get available events 
    app.get('/available-events', async (req, res) => {
      const query = { status: "Available" };
      const result = await eventsCollection.find(query).toArray();
      res.send(result);
    });

    // get single event details
    app.get('/event/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await eventsCollection.findOne(query);
      res.send(result);
    })

    // update event details
    app.put('/update-event/:id', verifyJWT, verifyAdmin, async (req,res) => {
      const id = req.params.id;
      const updateEvent = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          eventName: updateEvent.eventName,
          charge: updateEvent.charge,
          suggestedVenue: updateEvent.suggestedVenue,
          capacity: parseInt(updateEvent.capacity),
          description: updateEvent.description,
          totalBooked: parseInt(updateEvent.totalBooked),
          status: 'Pending',
        },
      };
      const result = await eventsCollection.updateOne(filter,updateDoc,options);
      res.send(result);
    })


    // packages routs  here
    app.post('/new-package',verifyJWT, verifyAdmin, async (req,res) => {
      const newPackage = req.body;
      //newClass.availableDates = parseInt(newClass.availableDates);
      const result = await packagesCollection.insertOne(newPackage);
      res.send(result);

    })
    app.get('/packages', async(req, res) => {
      const query = { status: "Available" };
      const  result = await packagesCollection.find(query).toArray();
      res.send(result);
    })

    // get packages by service types
    app.get('/packages/:type', async(req, res) => {
      const  type = req.params.type;
      const query  = {serviceType: type};
      const result = await packagesCollection.find(query).toArray();
      res.send(result); 
    })

    // manage packages
    app.get('/packages-manage', verifyJWT, verifyAdmin, async(req, res) => {
      //const query = { status: "Available" };
      const  result = await packagesCollectionCollection.find().toArray();
      res.send(result);
    })

    // get single package
    app.get('/package/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await packagesCollection.findOne(query);
      res.send(result);
    })

    // get available packages
    app.get('/available-packages', async (req, res) => {
      const query = { status: "Available" };
      const result = await packagesCollection.find(query).toArray();
      res.send(result);
    });

    // update packages
    app.patch('/change-package_status/:id', verifyJWT, verifyAdmin, async (req,res) => {
      const id = req.params.id;
      const status = req.body.status;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      const result = await packagesCollection.updateOne(filter,updateDoc,options);
      res.send(result);
    })

    // update package details
    app.put('/update-packages/:id', verifyJWT, verifyAdmin, async (req,res) => {
      const id = req.params.id;
      const updatePackage = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          serviceType: updatePackage.serviceType,
          charge: updatePackage.charge,
          description: updatePackage.description,
          status: 'Pending',
        },
      };
      const result = await packagesCollection.updateOne(filter,updateDoc,options);
      res.send(result);
    })
    
    // cart routes here
    app.post('/add-to-cart', verifyJWT, async (req, res) => {
      const newCartItem = req.body;
      const result = await cartCollection.insertOne(newCartItem);
      res.send(result);
    });

    //get cart item by  ID
    app.get('/cart-item/:id', verifyJWT, async (req,res) => {
      const id = req.params.id;
      const email = req.query.email;
      const query = {
        $or: [
          {eventId: id},
          {packageId: id}
        ],
        userMail: email,
      };
      const projection = {eventId: 1, packageId: 1};
      const result = await cartCollection.findOne(query, {projection: projection});
      res.send(result);
    })

    // get cart item by user email
    app.get ('/cart/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = {userMail: email};
      const projection = {eventId: 1, packageId: 1};
      const carts = await cartCollection.find(query,{projection: projection}).toArray();
      const eventIds = carts.map((cart) => new ObjectId(cart.eventId));
      const query2 = {_id: {$in: eventIds}};
      const result = await eventsCollection.find(query2).toArray();
      const packageIds = carts.map((cart) => new ObjectId(cart.packageId));
      const query3 = {_id: {$in: packageIds}};
      const result1 = await packagesCollection.find(query3).toArray();
      res.send({result,result1});
    });

    //delete a cart item
    app.delete('/delete-cart-item/:id', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = {
        $or: [
          {eventId: id},
          {packageId: id}
        ]
      };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    })

    //payment route
    app.post("/create-payment-intent",verifyJWT, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "inr",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });

    });

    app.post('/payment-info', verifyJWT, async (req, res) => {
      const paymentInfo = req.body;
      const { ids, userMail, transactionId, selectedDate } = paymentInfo;
  
      // Ensure ids is an array
      const idsArray = Array.isArray(ids) ? ids : [];
  
      try {
          const objectIds = idsArray.map(id => new ObjectId(id));
  
          const eventsQuery = { _id: { $in: objectIds } };
          const packagesQuery = { _id: { $in: objectIds } };
  
          const session = client.startSession();
          session.startTransaction();
  
          try {
              const events = await eventsCollection.find(eventsQuery).toArray();
              const packages = await packagesCollection.find(packagesQuery).toArray();
  
              if (!events.length && !packages.length) {
                  await session.abortTransaction();
                  session.endSession();
                  return res.status(404).json({ error: 'Events or packages not found' });
              }
  
              const totalBookedEvents = events.length;
              const totalBookedPackages = packages.length;
  
              const availableSeatsEvents = events.reduce((total, current) => total + current.availableSeats, 0) - totalBookedEvents;
              const availableSeatsPackages = packages.reduce((total, current) => total + current.availableSeats, 0) - totalBookedPackages;
              const totalAvailableSeats = availableSeatsEvents + availableSeatsPackages;
  
              const newBookedData = {
                  userMail,
                  ids: objectIds,
                  transactionId,
                  selectedDate
              };
  
              const updatedEventsDoc = {
                  $inc: {
                      availableSeats: -totalBookedEvents,
                  },
              };
  
              const updatedPackagesDoc = {
                  $inc: {
                      availableSeats: -totalBookedPackages,
                  },
              };
  
              const bookedResult = await bookedCollection.insertOne(newBookedData, { session });
              const updatedEventsResult = await eventsCollection.updateMany(eventsQuery, updatedEventsDoc, { session });
              const updatedPackagesResult = await packagesCollection.updateMany(packagesQuery, updatedPackagesDoc, { session });
              const deletedCartResult = await cartCollection.deleteMany({ userMail }, { session });
              const paymentResult = await paymentCollection.insertOne(paymentInfo, { session });
  
              await session.commitTransaction();
              session.endSession();

              //Send confirmation email
              sendPaymentConfirmationEmail(userMail, paymentInfo);
  
              res.send({ paymentResult, deletedCartResult, bookedResult, updatedEventsResult, updatedPackagesResult });
          } catch (error) {
              await session.abortTransaction();
              session.endSession();
              console.error('Error processing payment:', error);
              res.status(500).json({ error: 'Internal server error' });
          }
      } catch (error) {
          console.error('Error processing payment:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
  
    // get payment history
    app.get('/payment-history/:email', async (req,res) => {
      const email = req.params.email;
      const query =  {userMail: email};
      const result = await paymentCollection.find(query).sort({date: -1}).toArray();
      res.send(result);
    });

    // payment history length
    app.get('/payment-history-length/:email', async (req, res) => {
      const email = req.params.email;
      const query = { userMail: email };
      const total = await paymentCollection.countDocuments(query);
      res.send({ total });
  })

  // booking routes
  app.get('/popular_events', async (req, res) => {
            const result = await eventsCollection.find().sort({ totalBooked: -1 }).limit(6).toArray();
            res.send(result);
        });
  app.get('/popular_packages', async (req, res) => {
            const result = await packagesCollection.find().sort({ totalBooked: -1 }).limit(6).toArray();
            res.send(result);
        });
   //Admin status
   app.get('/admin-status',verifyJWT, verifyAdmin, async (req,res) => {
    const availableEvents = ((await  eventsCollection.find({status: 'Available'})).toArray()).length;
    const pendingEvents = ((await  eventsCollection.find({status: 'Pending'})).toArray()).length;
    const availablePackages = ((await  packagesCollection.find({status: 'Available'})).toArray()).length;
    const pendingPackages = ((await  packagesCollection.find({status: 'Pending'})).toArray()).length;

    const totalEvents = (await eventsCollection.find().toArray()).length;
    const totalPackages = (await packagesCollection.find().toArray()).length;
    const totalBooked = (await bookedCollection.find().toArray()).length;

    const result = {
      availableEvents,
      pendingEvents,
      availablePackages,
      pendingPackages,
      totalEvents,
      totalPackages,
      totalBooked
    }

    res.send(result);
   });

app.get('/booked-items/:email', verifyJWT, async (req, res) => {
    const email = req.params.email;

    try {
        const pipeline = [
            {
                $match: { userMail: email }
            },
            {
                $lookup: {
                    from: "events",
                    let: { eventIds: "$ids" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$eventIds"] }
                            }
                        }
                    ],
                    as: "events"
                }
            },
            {
                $lookup: {
                    from: "packages",
                    let: { packageIds: "$ids" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$packageIds"] }
                            }
                        }
                    ],
                    as: "packages"
                }
            },
            {
                $project: {
                    _id: 1,
                    userMail: 1,
                    ids: 1,
                    transactionId: 1,
                    events: {
                        $filter: {
                            input: "$events",
                            as: "event",
                            cond: { $in: ["$$event._id", "$ids"] }
                        }
                    },
                    packages: {
                        $filter: {
                            input: "$packages",
                            as: "package",
                            cond: { $in: ["$$package._id", "$ids"] }
                        }
                    }
                }
            }
        ];

        const bookedItems = await bookedCollection.aggregate(pipeline).toArray();

        if (!bookedItems) {
            return res.status(404).send('No booked items found for the user.');
        }

        res.status(200).json(bookedItems);
    } catch (error) {
        console.error('Error fetching booked items:', error);
        res.status(500).send('Internal server error');
    }
});












    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
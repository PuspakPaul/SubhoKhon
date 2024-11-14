import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from '@headlessui/react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ultilities/providers/AuthProvider";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';


const Packages = () => {
    const [classes, setClasses] = useState([]);
    const {currentUser} = useUser();
    console.log("Current user: ", currentUser)
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const navigate = useNavigate()

    const [hoveredCard, setHoverCard] = useState(null);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const {user} = useContext(AuthContext);
    //console.log("The current user:", user)

    const handlHover = (index) => {
        setHoverCard(index);
    }
    useEffect(() => {
        axiosFetch.get('/packages').then(res => setClasses(res.data)).catch(err => console.log(err))
    }, []);

    const handleSelect = (id) => {
        //console.log(id)
        axiosSecure.get(`/booked-packages/${currentUser?.email}`)
        .then((res) => setEnrolledClasses(res.data))
        .catch((err) => console.log(err));

        if(!currentUser) {
            alert("Please Login First")
            return navigate("/login")
        }

        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
        .then( res => {
            if (res.data.packageId === id) {
                return alert("Already Selected")
            } else if(enrolledClasses.find(item => item.classes._id === id)) {
                return alert("Already Enrolled")
            } else{
                const data ={
                    packageId: id,
                    userMail: currentUser?.email,
                    data: new Date()
                }
                
                axiosSecure.post('/add-to-cart', data)
                    .then(res => {
                        alert("Added to cart");
                        console.log(res.data)
                })
            }
        })
    }

    //console.log(classes)
    return (
        <div>
            <div className="mt-20 pt-3">
                <h1 className="text-4xl font-bold text-center text-secondary">Packages</h1>
            </div>

            <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    classes.map((cls, index) => (
                        <div
                        onMouseLeave={() => handlHover(null)}
                        key={index}
                        className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 
                         mx-auto ${cls.status < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 
                        rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                        onMouseEnter={() => handlHover(index)

                        }
                        >
                            <div className="relative h-48">
                                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-60" : ""}`}/>
                                <img src={cls.serviceImage} alt="" className="object-cover w-full h-full"/>

                                <Transition 
                                show={hoveredCard === index}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="Transition-opaity duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button onClick={() => handleSelect(cls._id)} title={role == 'admin' ? 'Admin can not be able to select' ? cls.status < 1 : 'No Seat Available' : "You can select events"}
                                        className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700 ">Add to Cart</button>
                                    </div>
                                </Transition>
                            </div>
                            <div className="px-6 py-2">
                                <h3 className="font-bold mb-1">{cls.serviceName}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-gray-600 text-xs">Capacity: {cls.status}</span>
                                    <span className="text-green-500 font-semibold">INR {cls.charges}</span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-gray-500 text-x3">Description: {cls.description}</p>
                                </div>
                                <Link to={`/events/${cls._id}`}><button className="px-4 py-2 mt-4 mb-2 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">View</button></Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Packages
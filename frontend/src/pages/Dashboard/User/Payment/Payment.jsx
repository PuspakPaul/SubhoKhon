import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
//import './Payment.css';
import CheckOut from "./CheckOut";

// Use your actual public key here
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
   const location = useLocation();
   //console.log(location)
   const charge = location?.state?.charge;
   const cartItem = location.state?.itemId;
   if(!charge) {
    return <Navigate to="dashboard/my-selected"/>
   }

    return (
        <div className="my-40 stripe-custom-class">
          <Elements stripe={stripePromise}>
            <CheckOut charge={charge} cartItem={cartItem}/>

          </Elements>  
        </div>
    );
};

export default Payment;
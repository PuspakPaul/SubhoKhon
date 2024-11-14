import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import { Navigate, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const CheckOut = ({ charge, cartItem }) => {
    const URL = `http://localhost:5000/payment-info`;
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [cart, setCart] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null)

    if (charge <= 0 || !charge) {
        return <Navigate to="/dashboard/my-selected" replace />;
    }

    useEffect(() => {
        if (currentUser) {
            axiosSecure.get(`/cart/${currentUser?.email}`)
                .then((res) => {
                    if (res.data && Array.isArray(res.data.result) && Array.isArray(res.data.result1)) {
                        const allEvents = [...res.data.result, ...res.data.result1];
                        const eventId = allEvents.map(item => item._id);
                        setCart(eventId);
                    } else {
                        console.error("Unexpected response format:", res.data);
                    }
                })
                .catch((err) => console.error("Error fetching cart items:", err));
        }
    }, [axiosSecure, currentUser]);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: charge })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => console.error("Error creating payment intent:", err));
    }, [axiosSecure, charge]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsProcessing(true);

        if (!stripe || !elements || !clientSecret) {
            setIsProcessing(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            setIsProcessing(false);
            return;
        }

        try {
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (paymentMethodError) {
                console.error("Stripe createPaymentMethod error:", paymentMethodError);
                setError(paymentMethodError.message);
                setIsProcessing(false);
                return;
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: currentUser?.name || "Unknown",
                        email: currentUser?.email || "Anonymous",
                    },
                }
            });

            if (confirmError) {
                console.error("Stripe confirmCardPayment error:", confirmError);
                setError(confirmError.message);
                setIsProcessing(false);
            }else{
                console.log("[Payment Intent]" ,paymentIntent)
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                const transactionId = paymentIntent.id;
                const paymentMethod = paymentIntent.payment_method;
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency;
                const paymentStatus = paymentIntent.status;
                const userName = currentUser?.name;
                const userMail = currentUser?.email;

                const data = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userMail,
                    ids: cartItem ? [cartItem] : cart,
                    selectedDate: selectedDate,
                    date: new Date()
                };

                //console.log(data);
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(res => {
                    console.log("Payment recorded:", res);
                    // Handle any further actions (e.g., redirect, display success message)
                    setSucceeded(true)
                })
                .catch(err => console.log(err));
            }
                    
            

        } catch (error) {
            console.error("Payment processing error:", error);
            setError("Payment processing error.");
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        {succeeded && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-green-500">Payment Successful!</h2>
                    <p className="mb-4">Your payment was successful.</p>
                    <button
                        onClick={() => navigate('/dashboard/booked-events')}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Go to Booked Events
                    </button>
                </div>
            </div>
        )}
    }, [succeeded, navigate]);

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">
                        Payment Amount: <span className="text-secondary">{charge} INR</span>
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            className="p-3 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-bold">Select Date</label>
                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} className="p-3 border rounded" />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || isProcessing}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : "Pay"}
                    </button>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
            </div>

            {succeeded && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 text-green-500">Payment Successful!</h2>
                        <p className="mb-4">Your payment was successful.</p>
                        <button
                            onClick={() => navigate('/dashboard/booked-events')}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Go to Booked Events
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CheckOut;

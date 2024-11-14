import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteSweep } from "react-icons/md";
import { FiDollarSign } from 'react-icons/fi';
import Swal from "sweetalert2";

const Selects = () => {
    const { currentUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (currentUser) {
            axiosSecure
                .get(`/cart/${currentUser.email}`)
                .then((response) => {
                    if (Array.isArray(response.data.result) && Array.isArray(response.data.result1)) {
                        const allEvents = [...response.data.result, ...response.data.result1];
                        setEvents(allEvents);
                    } else {
                        console.error("Expected arrays but got:", response.data);
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching cart data:", error);
                    setLoading(false);
                });
        }
    }, [axiosSecure, currentUser]);

    const totalPage = Math.ceil(events.length / itemPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPage) {
            setPage(newPage);
        }
    };

    const totalCharge = events.reduce((acc, item) => acc + parseInt(item.charge || item.charges || 0, 10), 0);
    const totalTax = totalCharge * 0.01;
    const charge = totalCharge + totalTax;

    const paginatedData = events.slice((page - 1) * itemPerPage, page * itemPerPage);

    const handlePay = (id) => {
        const item = events.find((item) => item._id === id);
        const charge = parseInt(item.charge || item.charges || 0, 10);
        navigate('/dashboard/user/payment', { state: { charge: charge, itemId: id } });
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token'); // Retrieve authentication token from local storage
        if (!token) {
            console.error("Authentication token not found.");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart-item/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then((response) => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const newEvents = events.filter((item) => item._id !== id);
                            setEvents(newEvents);
                        }
                    }).catch((error) => console.log("Error deleting item:", error));
            }
        });
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="my-6 text-center">
                <h1 className="text-4xl font-bold">My <span className="text-secondary">Cart</span></h1>
            </div>
            <div className="h-screen py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-4">Cart Items: </h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">#</th>
                                            <th className="text-left font-semibold">Item</th>
                                            <th className="text-left font-semibold">Charge</th>
                                            <th className="text-left font-semibold">Date</th>
                                            <th className="text-left font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            events.length === 0 ? (<tr><td colSpan="5" className="text-center text-2xl font-bold">Cart is empty</td></tr>) : (
                                                events.map((item, idx) => {
                                                    const itemIndex = (page - 1) * itemPerPage + idx + 1;
                                                    const itemImage = item.eventImage || item.serviceImage;
                                                    const itemName = item.eventName || item.serviceType;
                                                    const itemCharge = parseInt(item.charge || item.charges || 0, 10);
                                                    return (
                                                        <tr key={item._id}>
                                                            <td className="py-4">{itemIndex}</td>
                                                            <td className="py-4">
                                                                <div className="flex items-center">
                                                                    <img src={itemImage} alt="" className="h-16 w-16 mr-4" />
                                                                    <span>{itemName}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4">INR {isNaN(itemCharge) ? 0 : itemCharge}</td>
                                                            <td className="py-4">{/* Add Date if available */}</td>
                                                            <td className="py-4 flex pt-8 gap-2">
                                                                <button onClick={() => handleDelete(item._id)} className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold"><MdDeleteSweep /></button>
                                                                <button onClick={() => handlePay(item._id)} className="px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex items-center"><FiDollarSign className="mr-2" /></button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:w-1/5 fixed right-3">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>INR {isNaN(totalCharge) ? 0 : totalCharge}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>INR {isNaN(totalTax) ? 0 : totalTax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Extra Charges</span>
                                    <span>0</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">INR {isNaN(charge) ? 0 : charge.toFixed(2)}</span>
                                </div>
                                <button 
                                    disabled={charge <= 0} 
                                    onClick={() => navigate('/dashboard/user/payment', { state: { charge: charge, itemId: null } })}
                                    className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Selects;
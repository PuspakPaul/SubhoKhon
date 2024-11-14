import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useUser from "../../../../../hooks/useUser";
import { Pagination } from "@mui/material";

const PaymentHistory = () => {
    const axiosFetch = useAxiosFetch();
    const { currentUser} = useUser();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginatedPayments, setPaginatedPayments] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const totalItem = payments.length;
    const totalPage = Math.ceil(totalItem / itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const lastIndex = page * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        setPaginatedPayments(payments.slice(firstIndex, lastIndex));
    }, [page, payments]);

    useEffect(() => {
        if (currentUser?.email) {
            console.log('Current user email:', currentUser.email); // Debugging log
            axiosFetch.get(`/payment-history/${currentUser.email}`)
                .then(res => {
                    //console.log('API response:', res.data); // Debugging log
                    setPayments(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('API error:', err);
                    setError("Failed to fetch payment history");
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setError("User not logged in");
        }
    }, [axiosFetch, currentUser?.email]);

    const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="text-center mt-6 mb-16">
                <p className="text-gray-400">
                    Hey,{" "} 
                    <span className="text-secondary font-bold">{currentUser?.name}</span>{" "} 
                    Welcome...!
                </p>
                <h1 className="text-4xl font-bold">My Payment History</h1>
                <p className="text-gray-500 text-sm my-3">You can see your payment history here.</p>
            </div> 
            <div>
                    <p className="font-bold">Total Payments: {payments.length}</p>
                    <p className="font-bold">Total Paid: INR-{totalPaidAmount}</p>
                </div>
            <div>
            <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Item</th>
                                            <th className="text-left font-semibold">Charge</th>
                                            <th className="text-left font-semibold">TransactionId</th>
                                        </tr>
                                    </thead>
                                    
               
                    {paginatedPayments.map((payment, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4">{payment.amount}</td>
                            <td className="whitespace-nowrap px-6 py-4">{payment.transactionId}</td>
                        </tr>
                    ))
                    }

                    </table>

            </div>
            {totalPage > 1 && (
                <Pagination count={totalPage} page={page} onChange={handleChange} />
            )}
        </div>
    );
};

export default PaymentHistory;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { Pagination } from "@mui/material";

const ManageEvents = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosFetch = useAxiosFetch();
    const [packages, setPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemPerPage = 5;

    useEffect(() => {
        axiosFetch.get('/packages-manage').then(res => setPackages(res.data)).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axiosSecure
            .get('/packages')
            .then((response) => {
                console.log("Response data:", response.data);  // Debug log
                if (Array.isArray(response.data.result) && Array.isArray(response.data.result1)) {
                    const allPackages = [...response.data.result, ...response.data.result1];
                    setPackages(allPackages);
                } else if (Array.isArray(response.data)) {
                    setPackages(response.data);  // Handle case where response.data is already an array of events
                } else {
                    console.error("Expected arrays but got:", response.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events data:", error);
                setLoading(false);
            });
    }, [axiosSecure]);

    useEffect(() => {
        const lastIndex = page * itemPerPage;
        const firstIndex = lastIndex - itemPerPage;
        const currentData = packages.slice(firstIndex, lastIndex);
        setPaginatedData(currentData);
    }, [packages, page]);

    const totalPage = Math.ceil(packages.length / itemPerPage);

    const handleChange = (packages, value) => {
        setPage(value)
    }

    return (
        <div>
            <h1 className="text-4xl text-secondary font-bold text-center my-10">
                Manage <span className="text-black">Packages</span>
            </h1>
            <div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">PHOTO</th>
                                            <th scope="col" className="px-6 py-4">EVENTS NAME</th>
                                            <th scope="col" className="px-6 py-4">CHARGE</th>
                                            <th scope="col" className="px-6 py-4">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loading && paginatedData.map((packages) => (
                                            <tr
                                                key={packages._id}
                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <img src={packages.serviceImage} className="h-[35px] w-[35px]" alt="" />
                                                </td>
                                                <td className="whitespace-pre-wrap px-6 py-4">{packages.serviceType}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{packages.charges}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`font-bold ${packages.status === 'pending' ? 'bg-orange-400' : packages.status === 'available' ? 'bg-red-600' : 'bg-green-600' 
                                                    }`}>{packages.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="w-full h-full flex justify-center items-center my-10">
                        <Pagination onChange={handleChange} count={totalPage} color="primary"/>
                    </div>
                    </div>                    
            </div>
        </div>
    );
};

export default ManageEvents;
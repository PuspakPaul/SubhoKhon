import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import { Pagination } from "@mui/material";

const ManageEvents = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosFetch = useAxiosFetch();
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemPerPage = 5;

    useEffect(() => {
        axiosFetch.get('/events-manage').then(res => setEvents(res.data)).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axiosSecure
            .get("/events")
            .then((response) => {
                console.log("Response data:", response.data);  // Debug log
                if (Array.isArray(response.data.result) && Array.isArray(response.data.result1)) {
                    const allEvents = [...response.data.result, ...response.data.result1];
                    setEvents(allEvents);
                } else if (Array.isArray(response.data)) {
                    setEvents(response.data);  // Handle case where response.data is already an array of events
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
        const currentData = events.slice(firstIndex, lastIndex);
        setPaginatedData(currentData);
    }, [events, page]);

    const totalPage = Math.ceil(events.length / itemPerPage);

    const handleChange = (event, value) => {
        setPage(value)
    }

    const handleApprove = (id) => {
        axiosSecure.put(`/change-status/${id}` , {status: 'approved'}).then(res => {
            console.log(res.data);
            alert("Course Approved Successfully")
            const updateevents = events.map(event => event._id === id ? {...event, status: 'approved'} : event)
            setEvents(updateevents)
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <h1 className="text-4xl text-secondary font-bold text-center my-10">
                Manage <span className="text-black">Events</span>
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
                                        {!loading && paginatedData.map((event) => (
                                            <tr
                                                key={event._id}
                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <img src={event.eventImage} className="h-[35px] w-[35px]" alt="" />
                                                </td>
                                                <td className="whitespace-pre-wrap px-6 py-4">{event.eventName}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{event.charge}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`font-bold ${event.status === 'pending' ? 'bg-orange-400' : event.status === 'available' ? 'bg-red-600' : 'bg-green-600' 
                                                    }`}>{event.status}</span>
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

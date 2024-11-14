import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";

const Booking = () => {
    const [bookedItems, setBookedItems] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchBookedItems = async () => {
            try {
                if (currentUser?.email) {
                    const response = await axiosSecure.get(`/booked-items/${currentUser.email}`);
                    setBookedItems(response.data);
                }
            } catch (error) {
                console.error('Error fetching booked items:', error);
            }
        };

        fetchBookedItems();
    }, [axiosSecure, currentUser]);

    return (
        <div>
            <h1 className="text-2xl my-6">My Bookings</h1>
            <div className="grid md:grid-cols-2 grid-cos-1 lg:grid-cols-3 gap-6">
                {bookedItems.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    bookedItems.map((item, index) => (
                        <div key={index} className="mb-4">
                            <h2 className="text-xl font-bold">Events</h2>
                            {item.events.length === 0 ? (
                                <p>No events booked.</p>
                            ) : (
                                item.events.map((event, eventIndex) => (
                                    <div key={eventIndex} className="bg-white shadow-md h-96 mx-3 rounded-3xl flex md:flex-row justify-around items-cnter overflow-hidden sm:flex-grow sm:h-52 sm:w-3/5">
                                        <img src={event.eventImage} alt={event.eventName} className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover" />
                                        <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
                                        <p>{event.eventName}</p>
                                        </div>
                                        <div>{event.charge}</div>
                                    </div>
                                ))
                            )}
                            <h2 className="text-xl font-bold">Packages</h2>
                            {item.packages.length === 0 ? (
                                <p>No packages booked.</p>
                            ) : (
                                item.packages.map((packageItem, packageIndex) => (
                                    <div key={packageIndex} className="bg-white shadow-md h-96 mx-3 rounded-3xl flex md:flex-row justify-around items-cnter overflow-hidden sm:flex-grow sm:h-52 sm:w-3/5">
                                        <img src={packageItem.serviceImage} alt={packageItem.serviceType} className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover" />
                                        <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
                                        <p>{packageItem.serviceType}</p>
                                        </div>
                                        <div>{packageItem.charges}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Booking;
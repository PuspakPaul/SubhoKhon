import React from "react";
import {Link} from "react-router-dom"

const Card = ({item}) => {
    console.log(item)
    const {_id, eventName, eventImage, charge, capacity, totalBooked, suggestedVenue } = item;
    

    return (
        <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4 dark:text-gray">
            <img src={eventImage} alt="" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">{eventName}</h2>
                <p className="text-grey-600 mb-2 dark:text-white">Suggested Venue: {suggestedVenue}</p>
                <p className="text-grey-600 mb-2 dark:text-white">Capacity: {capacity}</p>
                <p className="text-grey-600 mb-2 dark:text-white">Charge: {charge}</p>
                <p className="text-grey-600 mb-2 dark:text-white">Total Booked: {totalBooked}</p>
                <Link to={'events/${_id}'} className="text-center mt-">
                    <button className="px-2 w-full py-1 bg-secondary rounded-xl text-white font-bold mt-2"><Link to="/events">Select</Link></button>
                </Link>
            </div>
        </div>
    )
}

export default Card
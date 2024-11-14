import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddEvents = () => {
    const [image, setImage] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);

        const newData = Object.fromEntries(formData);
        formData.append('image', image);  // Ensure the key 'image' matches the expected parameter by the API

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${KEY}`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log(data);
            if(data.success === true) {
                console.log(data.data.display_url);
                newData.eventImage = data.data.display_url;
                newData.status = 'available';
                newData.submitted = new Date();
                newData.totalEnrolled = 0;
                axiosSecure.post('/new-event', newData).then(res => {
                    alert("Successffully created event!");
                    console.log(res.data);
                })
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    return (
        <div>
            <div className="my-10">
                <h1 className="text-center text-3xl font-bold">Add Events</h1>
            </div>
            <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
                <div className="grid grid-cols-2 w-full gap-3 items-center">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="eventName">Event Name</label>
                        <input type="text" required placeholder="Event Name" name="eventName" id="eventName" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="eventImage">Event Image</label>
                        <input type="file" required name="eventImage" onChange={handleImageChange} className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4" />
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-3 items-center">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="charge">
                            Charge
                        </label>
                        <input className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="number"
                        required
                        placeholder="Please input the charge"
                        name="charge"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="suggestedVenue">Venue</label>
                        <input type="text" required placeholder="Suggested Venue" name="suggestedVenue" id="suggestedVenue" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-3 items-center">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="capacity">
                            Capacity
                        </label>
                        <input className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="number"
                        required
                        placeholder="Please input the capacity"
                        name="capacity"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">Status</label>
                        <input type="text" required placeholder="Status" name="status" id="status" className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500" />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                        Description About My Event
                    </label>
                    <textarea placeholder="Description About My Event" name="description" className="resize-none border w-full p-2 rounded-lg border-secondary outline-none" rows="4"></textarea>
                </div>
                <div className="text-center w-full">
                    <button className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded" type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddEvents
import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from '@headlessui/react'
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ultilities/providers/AuthProvider";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';



import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";


const SingleEvents = () => {
    const event = useLoaderData();
    const {currentUser} = useUser();
    //console.log(currentUser?.role)
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleSelect = (id) => {
        //console.log(id)
        axiosSecure.get(`/booked-events/${currentUser?.email}`)
        .then((res) => setEnrolledClasses(res.data))
        .catch((err) => console.log(err));

        if(!currentUser) {
            alert("Please Login First")
            return navigate("/login")
        }

        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
        .then( res => {
            if (res.data.eventId === id) {
                return alert("Already Selected")
            } else if(enrolledClasses.find(item => item.classes._id === id)) {
                return alert("Already Enrolled")
            } else{
                const data ={
                    eventId: id,
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

    return (
        <>
        <div className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto" data-new-gr-c-s-check-Loaded="14.1157.0" data-gr-ext-installed="">
            <div className="breadcrumbs bg-blue-300 py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
                <div className="container text-center">
                    <h2>Event Details</h2>
                </div>
            </div>

            <div className="nav-tab-wrapper tabs section-padding mt-8">
                <div className="container">
                    <div className="grid grid-cols-12 md:gap-[30px]">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="single-course-details">
                                <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                                    <img src={event.eventImage} alt="" className="rounded-md object-fut w-full h-full block" />
                                </div>
                                <h2 className="text-2xl mb-2">{event.eventName}</h2>

                                
                                <div className="nav-tab-wrapper mt-12">
                                    <ul id="tabs-nav" className="course-tab mb-8">
                                        <li className="active">
                                            <a href="#tab1">Overview</a>
                                        </li>
                                        <li>
                                            <a href="#tab2">Carriculum</a>
                                        </li>
                                        <li>
                                            <a href="#tab3">Reviews</a>
                                        </li>
                                    </ul>
                                    <div id="tabs-content">
                                        <div id="tab1" className="tab-content">
                                            <div>
                                                <h3 className="text-2xl mt-8">Event Description</h3>
                                                <p className="mt-4">{event.description}</p>
                                                <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                                                    <h4 className="text-2xl">Enjoy Our Great Hospitality</h4>
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl">What you get form us?</h4>
                                                    <p className="mt-4"> You'll get whole service from us . You'll get Decoration, Catering, Lightinng, Musician, Photographer, Videographer, Hospitality Group, Baker, Make-up Artist and everything needed to create an event successfull.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tabs-content">
                                        <div id="tab2" className="tab-content">
                                            <div>
                                                <h3 className="text-2xl mt-8">Event Carriculum</h3>
                                                <p className="mt-4">Our Subhokhon is the creation and development of small and/or large-scale personal or corporate events such as festivals, conferences, ceremonies, weddings, formal parties, concerts, or conventions. It involves studying the brand, identifying its target audience, devising the event concept, and coordinating the technical aspects before actually launching the event</p>
                                                <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                                                    <h4 className="text-2xl">You can design your dream event with us</h4>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div id="tabs-content">
                                        <div id="tab3" className="tab-content">
                                            <div>
                                                <h3 className="text-2xl mt-8">Reviews</h3>
                                                <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                                                    <h4 className="text-2xl">"The Subhokhon team was an absolute pleasure to work with. They were very responsive throughout the entire planning process, kept our team updated on changes, and were very accommodating to all our needs. Notably, when they received very short notice that our venue would no longer be available for the program, they immediately researched and visited various locations, took pictures for us, drew seating plans, and really understood our desire to have a location that fit the prestige of this program. Our partners had nothing but praise for the Conferences and Events team. We know the program would not have been as successful as it was without their invaluable contributions. "</h4>
                                                    <h4 className="text-2xl">"Thank you for helping us plan my sister's Wedding.Your neatness and creativity in decor was awesome. We loved everybit of it from smooth logistics to guests management and offcourse our Sangeet decor was cherry on the top. Our guests had great experience. We couldn't thank you enough dear Renuka."</h4>
                                                    <h4 className="text-2xl">"Our experience with Subhokhon is among the best relationships I've ever had with a vendor. The customer service is exceptional. They anticipate our needs and have solutions read for us. We speak to our account manager quarterly and our customer support every other month."</h4>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                            <div className="sidebarWrapper space-y-[30px]">
                                <div className="wdiget custom-text space-y-5">
                                    <a className="h-[220px] rounded relative block" href="#">
                                        <img 
                                            src={event.eventImage}
                                        alt=""
                                        className=" block w-full h-full object-cover rounded"
                                        />
                                        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <img src="data:image/jpeg;base64,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" alt="" />
                                        </div>
                                    </a>
                                    <h3>INR- {event.charge}</h3>
                                    <button onClick={() => handleSelect(event._id)} title={role === 'admin' ? 'Admin Can not be able to select ' ? event.status <1 : "No booking available " : "You can book this event"} disabled={role === "admin" || event.status < 1} className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white">
                                        Book Now
                                    </button>
                                    <ul className="list">
                                        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                                            <div className="flex-1 space-x-3 flex items-center">
                                                <FaLevelUpAlt className="inline-flex" />
                                                <div className="text-black font-semibold">
                                                    Suggested Venue
                                                </div>
                                            </div>
                                            <div className="flex-none">{event.suggestedVenue}</div>
                                        </li>

                                        <li className="flex space-x-3 border-b borde-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                                            <div className="flex-1 space-x-3 flex items-center">
                                                <FaUsers />
                                                <div className="text-black font-semibold">
                                                    Capacity
                                                </div>
                                            </div>
                                            <div className="flex-none">{event.capacity}</div>
                                        </li>
                                        <li className="flex space-x-3 border-b borde-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                                            <div className="flex-1 space-x-3 flex items-center">
                                                <FaUser />
                                                <div className="text-black font-semibold">
                                                    Total Booked
                                                </div>
                                            </div>
                                            <div className="flex-none">{event.totalBooked}</div>
                                        </li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleEvents
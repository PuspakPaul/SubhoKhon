import React from "react";
import { Link } from "react-router-dom";

const Hero2 = () => {
    return (
        <div className="min-h-screen bg-cover" style={{backgroundImage: 'url(https://getethnic.com/wp-content/uploads/2020/05/2Indian-Wedding-Rituals-indian-couple.jpg)'}}>
            <div className="min-h-screen flex justify-start p1-11 items-center text-white bg-black bg-opacity-60">
                <div>
                    <div className="space-y-4">
                        <p className="md:text-4x1 text-2x1">We Provide</p>
                        <h1 className="md:text-7x1 text-4x1 font-bold">Best Event Experience</h1>
                        <div className="md:w-1/2">
                            <p>Welcome to Subhokhon Event Management Company. We're one of the best event management company & wedding planner in Kolkata, India.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                        <button className="px-7 py-3 rounded-lg bg-secondary font-bold uppercase"><Link className="underline" to="/login">Join Us</Link></button>
                            <button className="px-7 py-3 roundd-lg border hover:bg-secondary font-bold uppercase"><Link className="underline" to="/events">View Services</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero2
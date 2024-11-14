import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="min-h-screen bg-cover" style={{backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/041/448/561/non_2x/happy-diwali-wishes-card-with-lantern-in-modern-style-vector.jpg)'}}>
            <div className="min-h-screen flex justify-start p1-11 items-center text-white bg-black bg-opacity-60">
                <div>
                    <div className="space-y-4">
                        <p className="md:text-4x1 text-2x1">We Provide</p>
                        <h1 className="md:text-7x1 text-4x1 font-bold">Best Event Experience</h1>
                        <div className="md:w-1/2">
                            <p>Shubho Khon translates to “Joyous Moments” in Bengali, and that’s precisely what we’re all about. Our team, clad in vibrant sarees and kurta-pajamas, dances to the rhythm of dhak while planning events that resonate with our rich culture. Here’s a glimpse of what Shubho Utsav Events brings to the table</p>
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
export default Hero
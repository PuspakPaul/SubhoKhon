import React from "react";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";

const Aboutus = () => {
    return (
        <div className="bg-creamish text-gray-800 min-h-screen p-8">
            <div className="mt-20 pt-3 text-center">
                <h1 className="text-4xl font-bold text-secondary">About Us</h1>
            </div>
            
            <div className="nav-tab-wrapper tabs section-padding mt-8">
                <div className="container mx-auto px-4">
                    <div className="lg:grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="single-course-details">
                                <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb rounded-md overflow-hidden">
                                    <img src="https://images.squarespace-cdn.com/content/v1/541f9f9de4b0450bd7d52418/1455321913452-2K9TSZ0Q5JAH0AG5ZBIU/IMG_1617_.jpg?format=1000w" alt="Event" className="object-cover w-full h-full block" />
                                </div>
                                <div className="nav-tab-wrapper mt-12">
                                    <div className="mb-8 text-center">
                                        <h3 className="text-3xl font-semibold">Who We Are</h3>
                                        <p className="mt-4 max-w-3xl mx-auto">Welcome to Subhokhon, a premier event management company dedicated to transforming your visions into unforgettable experiences. Our team brings creativity, precision, and a passion for excellence to every event we design and execute.</p>
                                    </div>
                                    <ul id="tabs-nav" className="course-tab flex justify-center space-x-4 mb-8">
                                        <li className="active">
                                            <a href="#tab1" className="text-lg font-semibold text-gray-700 hover:text-secondary">Mission</a>
                                        </li>
                                        <li>
                                            <a href="#tab2" className="text-lg font-semibold text-gray-700 hover:text-secondary">Vision</a>
                                        </li>
                                        <li>
                                            <a href="#tab3" className="text-lg font-semibold text-gray-700 hover:text-secondary">Testimonial</a>
                                        </li>
                                    </ul>
                                    <div id="tabs-content">
                                        <div id="tab1" className="tab-content">
                                            <div className="mb-8 text-center">
                                                <h3 className="text-3xl font-semibold">Our Mission</h3>
                                                <p className="mt-4 max-w-3xl mx-auto">Our mission is to deliver seamless, innovative, and memorable events that exceed our clients' expectations. We aim to create lasting impressions by combining our expertise with personalized service.</p>
                                                <div className="bg-gray-100 p-8 rounded-md my-8 text-left">
                                                    <h4 className="text-2xl font-semibold">What You Get From Us</h4>
                                                    <ul className="list-disc list-inside mt-4 space-y-2">
                                                        <li><b>Corporate Events:</b> Comprehensive solutions for conferences, seminars, product launches, and corporate retreats.</li>
                                                        <li><b>Social Events:</b> Elegant and personalized celebrations for weddings, birthdays, anniversaries, and special occasions.</li>
                                                        <li><b>Exhibitions and Trade Shows:</b> End-to-end management ensuring smooth and successful showcases.</li>
                                                        <li><b>Concerts and Festivals:</b> Large-scale event organization, including artist bookings, stage design, logistics, and crowd management.</li>
                                                        <li><b>Virtual and Hybrid Events:</b> Engaging virtual and hybrid events connecting audiences globally.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab2" className="tab-content">
                                            <div className="mb-8 text-center">
                                                <h3 className="text-3xl font-semibold">Our Vision</h3>
                                                <p className="mt-4 max-w-3xl mx-auto">We envision a world where every event is a masterpiece, and every client feels valued and understood. Our vision is to be the leading event management company known for our commitment to quality, innovation, and customer satisfaction.</p>
                                                <div className="bg-gray-100 p-8 rounded-md my-8 text-left">
                                                    <h4 className="text-2xl font-semibold">Design Your Dream Event With Us</h4>
                                                    <p>Join us to create extraordinary events that leave a lasting impact.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab3" className="tab-content">
                                            <div className="mb-8 text-center">
                                                <h3 className="text-3xl font-semibold">Why Choose Us</h3>
                                                <div className="bg-gray-100 p-8 rounded-md my-8 text-left">
                                                    <ul className="list-disc list-inside space-y-2">
                                                        <li><b>Experience and Expertise:</b> Extensive experience in handling events of all sizes and complexities.</li>
                                                        <li><b>Creative Solutions:</b> Innovative ideas ensuring your event stands out.</li>
                                                        <li><b>Attention to Detail:</b> Meticulous attention ensuring every aspect of your event is perfect.</li>
                                                        <li><b>Personalized Service:</b> Tailored solutions reflecting your unique style and vision.</li>
                                                        <li><b>Reliable and Efficient:</b> Efficient project management delivering exceptional results, on time and within budget.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="mb-8 text-center">
                                                <h3 className="text-3xl font-semibold">Our Clients</h3>
                                                <div className="bg-gray-100 p-8 rounded-md my-8 text-left">
                                                    <p>We have had the privilege of working with a diverse range of clients, from Fortune 500 companies and non-profits to private individuals.</p>
                                                </div>
                                            </div>
                                            <div className="mb-8 text-center">
                                                <h3 className="text-3xl font-semibold">Contact Us</h3>
                                                <div className="bg-gray-100 p-8 rounded-md my-8 text-left">
                                                    <p><b>Email:</b> Subhokhon@gmail.com</p>
                                                    <p><b>Phone:</b> 033-26859750</p>
                                                    <p><b>Address:</b> Kolkata, West Bengal</p>
                                                </div>
                                            </div>
                                            <div className="mb-8 text-center">
                                                <h3 className="text-3xl font-semibold">Join Us</h3>
                                                <p className="mt-4 max-w-3xl mx-auto">Join us on our journey to create extraordinary events that leave a lasting impact. At Subhokhon, your event is our passion.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="space-y-8">
                                <div className="p-6 bg-gray-100 rounded-md shadow-md">
                                    <img src="https://i.pinimg.com/564x/eb/4e/2c/eb4e2ccb8341b399de6856b4685fc9c9.jpg" alt="Team" className="rounded-md object-cover w-full h-48 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                                    <p>Meet our dedicated team of professionals who bring creativity and precision to every event.</p>
                                </div>
                                <div className="p-6 bg-gray-100 rounded-md shadow-md">
                                    <img src="https://f.hellowork.com/blogdumoderateur/2022/10/outils-gestion-entreprise-quotidien.jpg" alt="Event Planning" className="rounded-md object-cover w-full h-48 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Our Process</h3>
                                    <p>Discover our meticulous event planning process that ensures every detail is perfect.</p>
                                </div>
                                <div className="p-6 bg-gray-100 rounded-md shadow-md">
                                    <img src="https://i.pinimg.com/564x/31/bb/5b/31bb5b12e99840c5a1571878f30b69ef.jpg" alt="Client Testimonials" className="rounded-md object-cover w-full h-48 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Client Testimonials</h3>
                                    <p>Hear what our satisfied clients have to say about their experiences with Subhokhon.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;
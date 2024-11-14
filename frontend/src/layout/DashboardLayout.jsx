import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaHome, FaUser } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5"
import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill} from "react-icons/bs";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBrandAppleArcade } from "react-icons/tb";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdExplore, MdOfflineBolt, MdPayments } from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";
import Swal from "sweetalert2";
import useScroll from "../hooks/useScroll";

const adminNavItems = [
    {to: "/dashboard/admin-home", icon: <BiHomeAlt className="text-2xl" />, label: "Dashboard Home" },
    {to: "/dashboard/manage-users", icon: <FaUser className="text-2xl" />, label: "Manage Users"},
    {to: "/dashboard/manage-events", icon: <BsFillPostcardFill className="text-2xl" />, label: "Manage Events"},
    {to: "/dashboard/manage-packages", icon: <BsFillPostcardFill className="text-2xl" />, label: "Manage Packages"},
    {to: "/dashboard/add-events", icon: <MdExplore className="text-2xl" />, label: "Create an event"},
    {to: "/dashboard/add-packages", icon: <MdExplore className="text-2xl" />, label: "Create an package"},
];

const user = [
    {to: "/dashboard/user-cp", icon: <BiHomeAlt className="text-2xl" />, label: "Dashboard Home" },
    {to: "/dashboard/booked-events", icon: <SiGoogleclassroom className="text-2xl" />, label: "My Bookings" },
    {to: "/dashboard/my-selected", icon: <BiSelectMultiple className="text-2xl" />, label: "My Selected" },
    {to: "/dashboard/my-payments", icon: <MdPayments className="text-2xl" />, label: "Payment History" }
];

const lastMenuItems = [
    {to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
    {to: "/trending", icon: <MdOfflineBolt className="text-2xl" />, label: "Trending" },
    {to: "/browse", icon: <GiFigurehead className="text-2xl" />, label: "Following"},
]

const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const {loader, logout} = useAuth();
    const {currentUser} = useUser();
    const navigate = useNavigate();
    const role = currentUser?.role;

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "Warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,log me out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout().then(
                Swal.fire({
                    title: "Logged Out",
                    text: "Your file has bn deleted.",
                    icon: "Success"
                })).catch((error) => console.log(error) );
            }
            navigate("/")
        });
    }

    //const role = "admin";

    if(loader) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="flex">
            <div className={`${open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}>
                <div className="flex gap-x-4 ites-center">
                    <img onClick={() => setOpen(!open)} src="data:image/jpeg;base64,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" alt="" className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} />
                    <Link to="/"><h1 onClick={() => setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}>Subhokhon</h1></Link>
                </div>

                {
                    role === "admin" && <ul className="pt-6">
                        <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                        {
                            role === "admin" && adminNavItems.map((menuItem, index) => (
                                <li key={index} className="mb-2">
                                    <NavLink to={menuItem.to} className={({ isActive }) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }

{
                    role === "user" && <ul className="pt-6">
                        <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                        {
                            role === "user" && user.map((menuItem, index) => (
                                <li key={index} className="mb-2">
                                    <NavLink to={menuItem.to} className={({ isActive }) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }

                <ul className="pt-6">
                    <p className={`ml-3 text-gray-500 uppercase ${!open && "hidden"}`}>
                        <small>Useful Links</small>
                    </p>
                    {
                            lastMenuItems.map((menuItem, index) => (
                                <li key={index} className="mb-2">
                                    <NavLink to={menuItem.to} className={({ isActive }) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li>
                            <button  onClick={() => handleLogOut()} className="flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4">
                                <BiLogInCircle className="text-2xl" />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
                            </button>
                        </li>
                </ul>
            </div>
            <div className="h-screen overflow-y-auto px-8 flex-1">
                <useScroll/>
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardLayout
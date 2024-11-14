import { Switch, ThemeProvider, createTheme } from "@mui/material";
import { duration } from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import Swal from 'sweetalert2'

import {FaBars} from "react-icons/fa" 
import { AuthContext } from "../../ultilities/providers/AuthProvider";

const navLinks = [
    {name: 'Home', route: '/'},
    {name: 'About Us', route: '/aboutus'},
    {name: 'Events', route: '/events'},
    {name: 'Packages', route: '/packages'},
];

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00",
        },
    },
});

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [navBg, setNavBg] = useState('bg-[#15151580]');
    const {logout, user} = useContext(AuthContext);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    };

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if(isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(()=> {
        if(scrollPosition > 100) {
            if(isHome) {
                setNavBg('bg-black backdrop-filter backdrop-blur-x1 bg-opacity-0 dark:text-white text-black')
            }
            else{
                setNavBg('bg-white dark:bg-black dark:text-white text-black')
            }
        } else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'}
            dark:text-white text-white`)
        }
    }, [scrollPosition]);

    const handleLogout = (e) => {
        e.preventDefault();
        //console.log("Logged out")
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!"
          }).then((result) => {
            if (result.isConfirmed) {
                logout()
                .then(() => {
                    Swal.fire({
                        title: "Logged out!",
                        text: "You are successfully logged out",
                        icon: "success"
              });
                })
                .catch((err) => {
                    Swal.fire("Error!", err.message, "error");
                });
              
            }
          });
    }

    return (
        <motion.nav 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5}}
        className={`${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2x1"} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}>
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className="px-4 py-4 flex items-center justify-between">
                    {/* logo */}
                    <div onClick={() => navigate('/')} className="flex-shrink-0 cursor-pointer p1-7 md:p-0 flex items-center">
                        <div><h1 className="text-4x1 inline-flex gap-5 items-center font-bold">Subhokhon <img src="data:image/jpeg;base64,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" alt="" className="w-8 h-8" /></h1>
                        <p className="font-bold text-[10px] tracking-[8px]">The Precious Hours</p></div>
                    </div>

                    {/* mobile menu icpns */}
                    <div className="md:hidden flex items-center">
                        <button type="button" onClick={toggleMobileMenu} className="text-grey-300 hover:text-white focus:outline-none">
                            <FaBars className="h-6 w-6 hover:text-primary"/>
                        </button>
                    </div>

                    {/* Navigational Links */}
                    <div className="hidden md:block text-black dark:text-white">
                        <div className="flex">
                            <ul className="ml-10 flex items-center space-x-4 pr-4">
                                {
                                    navLinks.map((Link) => (
                                        <li key={Link.route}>
                                            <NavLink
                                             to={Link.route}
                                             style={{whiteSpace: "nowrap"}}
                                             className={({ isActive }) =>
                                             `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-30`
                                             }
                                             >
                                                {Link.name}
                                                </NavLink>
                                        </li>
                                    ))
                                }

                                {/* based on users */}
                                {
                                    user ? null: isLogin ? <li><NavLink to="/register" className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-30`
                                        }>Register</NavLink></li> : <li><NavLink to="/login" className={({ isActive }) =>
                                            `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-30`
                                            }>Login</NavLink></li>
                                }

                                {
                                    user && <li>
                                        <NavLink to ='/dashboard' className={({ isActive }) =>
                                             `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-30`
                                             }>Dashboard</NavLink>
                                    </li>
                                }

                                {
                                    user && <li>
                                        <img src={'data:image/jpeg;base64,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'} alt="" className="h-[40px] rounded-full w-[40px]" />
                                    </li>
                                }

                                {
                                    user && <li><NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-x1'}> Logout</NavLink></li>
                                }

                                {/* color toggle */}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className="flex flex-col justify-center items-center">
                                            <Switch onChange={() => setIsDarkMode(!isDarkMode)}/>
                                            <h1 className="text-[8px]">Light/Dark</h1>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
export default NavBar
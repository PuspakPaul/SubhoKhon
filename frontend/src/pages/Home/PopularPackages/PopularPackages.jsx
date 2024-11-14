import React, { useEffect, useState} from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Card1 from "./Card1";

const PopularPackages = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axiosFetch.get('/packages');
            //console.log(response.data);
            setClasses(response.data);
        }

        fetchClasses();
    }, [])

    //console.log(classes)
    return (
        <div className="md:w-[80%] mx-auto my-36">
            <div>
                <h1 className="text-5x1 font-bold text-center dark:text-white">Our <span className="text-secondary dark:text-white">Popular Packages</span></h1>
                <div className="w-[40%] text-center mx-auto my-4">
                    <p className="text-gray-500">Welcome to Subhokhon Event Management Company. We're one of the best event management company & wedding planner in Kolkata, India.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    classes.slice(0,9).map((item, index) => <Card1 key={index} item={item}/>)
                }
            </div>
        </div>
    )
}

export default PopularPackages
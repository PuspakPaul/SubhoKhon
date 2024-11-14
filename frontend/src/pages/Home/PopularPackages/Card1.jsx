import React from "react";
import {Link} from "react-router-dom"

const Card1 = ({item}) => {
    console.log(item)
    const {_id, serviceType, serviceImage, charges,  } = item;
    

    return (
        <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4">
            <img src={serviceImage} alt="" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">{serviceType}</h2>
                <p className="text-grey-600 mb-2 dark:text-white">Charges: {charges}</p>
                <Link to={'packages/${_id}'} className="text-center mt- dark:text-white">
                    <button className="px-2 w-full py-1 bg-secondary rounded-xl text-white font-bold mt-2"><Link to='/packages'>Select</Link></button>
                </Link>
            </div>
        </div>
    )
}

export default Card1
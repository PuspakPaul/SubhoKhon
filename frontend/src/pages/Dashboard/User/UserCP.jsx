import React from "react";
import useUser from "../../../hooks/useUser";

const UserCP = () => {
    const {currentUser} = useUser()
    return (
        <div className="h-screen flex justify-center items-center p-2">
            <div>
                <div>
                    <div>
                        <img src="https://img.freepik.com/premium-vector/illustration-indian-couple-indian-traditional-dress_727517-9.jpg" alt="" className="h-[400px]" placeholder="blur"/>
                    </div>
                    <h1 className="text-4xl capitalize font-bold"><span className="text-secondary items-stretch">{currentUser?.name}, </span>Welcome to your dashboard</h1>
                    <p className="text-center text-base py-2"><span>{currentUser?.name} </span>start your journey with us from here. </p>
                    <div className=""></div>
                </div>
            </div>
        </div>
    )
}

export default UserCP
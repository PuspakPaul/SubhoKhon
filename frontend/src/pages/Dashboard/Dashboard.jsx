import React from "react";
import useUser from "../../hooks/useUser";
import DashboardNavigate from "../../routes/DashboardNavigate";

const Dashboard = () => {
    const {currentUser, isLoading} = useUser();
    const role = currentUser?.role;

    if(isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }
        return (
            <DashboardNavigate/>
        )
}

export default Dashboard
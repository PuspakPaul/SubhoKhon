import React from "react";
import useUser from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const DashboardNavigate = () => {
    const {currentUser, isLoading} = useUser();
    const role = currentUser?.name;
    if (isLoading) {
        return <div>Loading...</div>
    }
    if(role === 'admin') return <Navigate to="/dashboard/admin-home" replace/>
    if(role === 'user') return <Navigate to="/dashboard/user-cp" replace/>
}

export default DashboardNavigate
import { useContext, useEffect } from "react"
import { AuthContext } from "../ultilities/providers/AuthProvider"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMemo } from 'react';
import { config } from "localforage";


const useAxiosSecure = () => {
   const {logout} = useContext(AuthContext);
   const navigate = useNavigate();
   
   const axiosSecure =  useMemo(() => {
    return axios.create({
    baseURL: 'http://localhost:5000'
    });
   });
   useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })

    const responseInterceptor = axiosSecure.interceptors.response.use((response) => response, async(error) => {
        if(error.response && (error.response.status === 401 || error.response.status === 403)) {
            await logout();
            navigate('/login');
            throw error;
        }

        throw error;
    })

    return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
    }


   }, [logout, navigate, axiosSecure])

   return axiosSecure;
}

export default useAxiosSecure
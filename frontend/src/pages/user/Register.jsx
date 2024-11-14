import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/Social/GoogleLogin";
import { AuthContext } from "../../ultilities/providers/AuthProvider";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const {signUp, updateUser, setError} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data)  => {
        setError("");
        signUp(data.email, data.password).then((result) => {
            const user = result.user;
            if(user) {
                return updateUser(data.name).then(() => {
                    const userImp = {
                        name: user?.displayName,
                        email: user?.email,
                        phone: data.phone,
                        address: data.address,
                        role: "user"
                    };

                    if(user.email && user.displayName) {
                        return axios.post('http://localhost:5000/new-user', userImp).then(() => {
                            setError("")
                            navigate('/');
                        
                            return "Registration Successful!"
                        }).catch((err) => {
                            throw new Error(err);
                        })
                    }
                })
                .catch((err) => {
                    setError(err.code);
                    throw new Error(err)
                });
            }
        });
    };

    const password = watch('password', '')

    return (
        <div className="flex justify-center items-center pt-14 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center gap-5">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            <AiOutlineUser  className="inline-block mr-2 mb-1 text-lg"/>
                            Name
                            </label>
                            <input type="text" placeholder="Enter your name" {...register("name", { required: true })} className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            <AiOutlineMail  className="inline-block mr-2 mb-1 text-lg"/>
                            Email
                            </label>
                            <input type="email" placeholder="Enter your email address" {...register("email", { required: true })} className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            <AiOutlineLock  className="inline-block mr-2 mb-1 text-lg"/>
                            Password
                            </label>
                            <input type="password" placeholder="Enter your password" {...register("password", { required: true })} className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirm password" className="block text-gray-700 font-bold mb-2">
                            <AiOutlineLock  className="inline-block mr-2 mb-1 text-lg"/>
                            Confirm Password
                            </label>
                            <input type="password" placeholder="Confirm Your Password" {...register("confirm password", { required: true, validate: (value) => value === password || "password not matched!" })} className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                            <AiOutlinePhone  className="inline-block mr-2 mb-1 text-lg"/>
                            Phone Number
                            </label>
                            <input type="tel" placeholder="Enter your phone number" {...register("phone", { required: true })} className="w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"/>
                        </div>
                    </div>
                    
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                            <HiOutlineLocationMarker  className="inline-block mr-2 mb-1 text-lg"/>
                            Address
                            </label>
                            <textarea {...register("address", { required: true })} rows="3" className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter address"></textarea>
                        </div>
                        
                        <div className="text-center">
                            <button type="submit" className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md">Register</button>
                            {
                                errors.password && (<div className="text-red-500 text-sm w-full mt-1">
                                    <p>Password doesn't match</p>
                                    </div>)
                            }
                        </div>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="underline text-secondary ml-1">Login</Link>
                </p>
                <GoogleLogin/>
            </div>
        </div>
    )
}

export default Register
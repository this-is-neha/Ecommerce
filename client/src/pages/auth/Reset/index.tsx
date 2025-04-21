import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const onSubmit = async (data: any) => {
        try {
       
            const token = localStorage.getItem('accessToken');

            const response = await axios.put(
                "http://localhost:9004/auth/reset-password",
                { newPassword: data.newPassword },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setMessage(response.data.message);
            setError(""); 
            
       
            setTimeout(() => {
                navigate("/login"); 
            }, 2000); 
        } catch (exception: any) {
            setError(exception.response?.data?.message || "An error occurred. Please try again.");
            setMessage("");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Change Your Password</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        className={`w-full p-2 mt-1 border rounded ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                        {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            }
                        })}
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                </div>
            </form>

            {message && (
                <div className="mt-4 text-green-600">
                    <p>{message}</p>
                </div>
            )}

            {error && (
                <div className="mt-4 text-red-600">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;

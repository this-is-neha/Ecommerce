import { useContext, useEffect, useState } from 'react';
import axiosInstance from "axios";  
import { useNavigate } from 'react-router-dom';
import {AuthContext}  from '../../context/auth.context';
import { FooterComponent, HeaderComponent } from '../../components/common';

const baseURLl = import.meta.env.VITE_API_BASE_URL;

interface User {
    name: string;
    email: string;
    role: string;
    image?: string;  
    address?: string; 
    _id: string;
}

const UserDetails = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const baseURL = "../../../uploads/users/";

 
    const getLoggedInUser = async () => {
        try {
            const token = localStorage.getItem("accessToken") || null;
            const response = await axiosInstance.get(`${baseURLl}/auth/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
    console.log("Response:", response); 
            
            if (response.data.result) {
                const user = response.data.result;
                setLoggedInUser(user);
                console.log("User Name:", user.name);
            } else {
                console.error("No result data found in response:", response);
                setLoggedInUser(null); 
            }
        } catch (exception) {
            console.error("Error fetching user details:", exception);
            setLoggedInUser(null); 
        } finally {
            setLoading(false);
        }
    };
    
    
    

    useEffect(() => {
        const token = localStorage.getItem("accessToken") || null;
        if (token) {
            getLoggedInUser();
        } else {
            setLoading(false);
        }
    }, []); 

    if (loading) {
        return <div>Loading user details...</div>;
    }

    if (!loggedInUser) {
        return <div>No user details found. Please log in.</div>;
    }

    return (
        <>
            <HeaderComponent />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-semibold mb-4">User Details</h2>
                <div className="relative bg-white shadow-md rounded-lg p-6">

                   
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={() => navigate(`/${loggedInUser._id}/cart`)}
                        >
                            Cart Items
                        </button>

                        <button 
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            onClick={() => navigate(`/${loggedInUser._id}/orders`)}
                        >
                            Your Orders
                        </button>

                        {loggedInUser.role === "admin" && (
                            <button 
                                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                                onClick={() => navigate('/admin/page')}
                            >
                                Admin Panel
                            </button>
                        )}
                    </div>

                    
                    <div className="mt-16">
                        <div className="mb-4 text-xl">
                            <strong>Id: </strong>{loggedInUser._id}
                        </div>
                        <div className="mb-4 text-xl">
                            <strong>Name: </strong>{loggedInUser.name}
                        </div>
                        <div className="mb-4 text-xl">
                            <strong>Email: </strong>{loggedInUser.email}
                        </div>
                        <div className="mb-4 text-xl">
                            <strong>Role: </strong>{loggedInUser.role}
                        </div>

                        {loggedInUser.image && (
                            <div className="mb-6">
                                <strong className="text-xl">Profile Image: </strong>
                                <div className="mt-2">
                                    <img 
                                        src={`${baseURL}${loggedInUser.image}`} 
                                        alt="Profile"
                                        className="w-[300px] h-[300px] object-cover rounded-lg mx-auto" 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default UserDetails;

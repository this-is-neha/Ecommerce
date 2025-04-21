// import React, { useContext, useEffect, useState } from 'react';
// import axiosInstance from "../../config/axios.config";  
// import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import { AuthContext } from '../../context/auth.context';
// import { FooterComponent, HeaderComponent } from '../../components/common';

// interface User {
//     name: string;
//     email: string;
//     role: string;
//     image?: string;  
//     address?: string; 
//     _id: string;
// }

// const UserDetails = () => {
//     const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);
//     const auth = useContext(AuthContext);
//     const navigate = useNavigate();  // Initialize navigate hook
//     const baseURL = "http://127.0.0.1:5500/public/uploads/users/";

//     const getLoggedInUser = async () => {
//         try {
//             const token = localStorage.getItem("accessToken") || null;
//             const response = await axiosInstance.get('/auth/me', {
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                 },
//             });
            
//             const user: User = response.result;
//             setLoggedInUser(user);
//             console.log("User Namedsfjhdh",user.name)
//         } catch (exception) {
//             console.error("Error fetching user details:", exception);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("accessToken") || null;
//         if (token) {
//             getLoggedInUser();
//         } else {
//             setLoading(false);
//         }
//     }, []); 

//     if (loading) {
//         return <div>Loading user details...</div>;
//     }

//     if (!loggedInUser) {
//         return <div>No user details found. Please log in.</div>;
//     }

//     return (
//         <>
//             <HeaderComponent />
//             <div className="container mx-auto p-6 relative">
//                 <h2 className="text-3xl font-semibold mb-4">User Details</h2>
//                 <div className="bg-white shadow-md rounded-lg p-4">

//                     <div className="mb-4 text-xl">
//                         <strong>Id: </strong>{loggedInUser._id}
//                     </div>
//                     <div className="mb-4 text-xl">
//                         <strong>Name: </strong>{loggedInUser.name}
//                     </div>
//                     <div className="mb-4 text-xl">
//                         <strong>Email: </strong>{loggedInUser.email}
//                     </div>
//                     <div className="mb-4 text-xl">
//                         <strong>Role: </strong>{loggedInUser.role}
//                     </div>
//                     {loggedInUser.image && (
//                         <div className="mb-4 text-xl">
//                             <strong>Profile Image: </strong>
//                             <img 
//                                 src={`${baseURL}${loggedInUser.image}`} 
//                                 alt="Profile"
//                                 className="w-[500px] h-[500px] -full" 
//                             />
//                         </div>
//                     )}
//                 </div>

//                 {/* Add button in the top right corner */}
//                 <button 
//                     className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                     onClick={() => navigate(`/${loggedInUser._id}/cart`)}  // Navigate to the desired page
//                 >
//                    Cart Items
//                 </button>
               
//             </div>
//             <FooterComponent />
//         </>
//     );
// };

// export default UserDetails;

import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from "../../config/axios.config";  
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { AuthContext } from '../../context/auth.context';
import { FooterComponent, HeaderComponent } from '../../components/common';

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
    const navigate = useNavigate();  // Initialize navigate hook
    const baseURL = "http://127.0.0.1:5500/public/uploads/users/";

    const getLoggedInUser = async () => {
        try {
            const token = localStorage.getItem("accessToken") || null;
            const response = await axiosInstance.get('/auth/me', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            
            const user: User = response.result;
            setLoggedInUser(user);
            console.log("User Name:", user.name);
        } catch (exception) {
            console.error("Error fetching user details:", exception);
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
            <div className="container mx-auto p-6 relative">
                <h2 className="text-3xl font-semibold mb-4">User Details</h2>
                <div className="bg-white shadow-md rounded-lg p-4">

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
                        <div className="mb-4 text-xl">
                            <strong>Profile Image: </strong>
                            <img 
                                src={`${baseURL}${loggedInUser.image}`} 
                                alt="Profile"
                                className="w-[500px] h-[500px] -full" 
                            />
                        </div>
                    )}
                </div>

                {/* Cart Items button */}
                <button 
                    className="absolute top-6 right-36 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => navigate(`/${loggedInUser._id}/cart`)}  // Navigate to the cart page
                >
                   Cart Items
                </button>

                {/* Your Orders button */}
                <button 
                    className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => navigate(`/${loggedInUser._id}/orders`)}  // Navigate to the orders page
                >
                   Your Orders
                </button>
            </div>
            <FooterComponent />
        </>
    );
};

export default UserDetails;

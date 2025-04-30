


// import React, { createContext, useState, useEffect, ReactNode } from "react";

// import axiosInstance from "axios";
// const baseURL = import.meta.env.VITE_API_BASE_URL; 
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   meta?: any;
// }

// interface AuthContextType {
//   loggedInUser: User | null;
//   setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

//   const getLoggedInUser = async () => {
//     try {
//       const response = await axiosInstance.get(`${baseURL}/auth/me`, {
//          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
//        });
//        console.log("Response:", response);
//        setLoggedInUser(response.data.data.result);
//     } catch (error) {
//       console.error("Error fetching logged-in user:", error);
//     }
//   };

//   useEffect(() => {
//     getLoggedInUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL; 

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  meta?: any;
}

interface AuthContextType {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const getLoggedInUser = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    try {
      const response = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setLoggedInUser(response.data.data.result);
      } else {
        console.error("Error fetching logged-in user:", response);
        logoutUser();  // Clear token if invalid response
      }
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
      logoutUser();  // Handle errors (e.g., expired token)
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    setLoggedInUser(null);
    // Optionally, you can navigate to the login page here:
    // navigate("/login");
  };

  useEffect(() => {
    getLoggedInUser();
  }, []); // Run once when the component mounts

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

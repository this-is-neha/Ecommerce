


// import React, { createContext, useState, useEffect, ReactNode } from "react";
//  // Adjust the import based on your setup
// import axiosInstance from "axios";
// const baseURL = import.meta.env.VITE_API_BASE_URL; // Adjust the import based on your setup
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

import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  loggedInUser: any;
  setLoggedInUser: (data: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  setLoggedInUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// // import { createContext,useState } from "react";

// // const AuthContext =createContext({loggedInUser:null,setLoggedInUser:Function} as any);

// // export const AuthProvider=({children}:any)=>{
// //   const [loggedInUser,setLoggedInUser]=useState()
// //  const setUser=(data:any)=>{
// //     console.log("I am here",data)
// //     setLoggedInUser(data);
// //  }
 
// //  return(<>
    
// //     <AuthContext.Provider value={{loggedInUser:loggedInUser,setLoggedInUser:setUser}}>


// //     {children}

// //     </AuthContext.Provider>
    
// //     </>)
// // }

// // export default AuthContext



// import { createContext, useState } from "react";

// const AuthContext = createContext({ loggedInUser: null, setLoggedInUser: Function } as any);

// export const AuthProvider = ({ children }: any) => {
//   const [loggedInUser, setLoggedInUser] = useState(null); // Initialize state with null

//   const setUser = (data: any) => {
//     console.log("I am here", data);
//     setLoggedInUser(data);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedInUser, setLoggedInUser: setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;




// import { createContext, useState, ReactNode } from "react";

// interface AuthContextType {
//   loggedInUser: any; // Adjust the type according to your user data structure
//   setLoggedInUser: (data: any) => void; // Define the function type properly
// }

// // Create context with a default value that matches the defined type
// const AuthContext = createContext<AuthContextType>({
//   loggedInUser: null,
//   setLoggedInUser: () => {}, // Providing a no-op function as default
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [loggedInUser, setLoggedInUser] = useState<any>(null); // Initialize with null

//   const setUser = (data: any) => {
//     console.log("Setting user data:", data); // Logging for debugging
//     setLoggedInUser(data);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedInUser, setLoggedInUser: setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;



// src/context/auth.context.



import React, { createContext, useState, useEffect, ReactNode } from "react";
 // Adjust the import based on your setup
import axiosInstance from "../config/axios.config";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const getLoggedInUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/me', {
         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
       });
       setLoggedInUser(response.data.result);
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

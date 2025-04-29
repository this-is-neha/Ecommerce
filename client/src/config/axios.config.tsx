// import axios from "axios";
// const axiosInstance = axios.create({
//     baseURL:import.meta.env.VITE_API_URL,
//     timeout:30000,
//     timeoutErrorMessage:"Server timed out",
//     headers:{
//         "Content-Type":"application/json"
//     }
// })
// axiosInstance.interceptors.response.use((response)=>{

// return response.data
// },(exception)=>{
//     if(exception.code==='ERR_BAD_REQUEST'){
//         throw exception.response.data
//     }
//     else{
//         console.log("ResponseIntecep:",exception)
//         throw exception
    
//     }
    
// })
// export default axiosInstance





// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 30000,
//   timeoutErrorMessage: "Server timed out",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Add this interceptor to include token
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Already present: handling response or error
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (exception) => {
//     if (exception.code === "ERR_BAD_REQUEST") {
//       throw exception.response.data;
//     } else {
//       console.log("ResponseIntercep:", exception);
//       throw exception;
//     }
//   }
// );

// export default axiosInstance;

import axios from "axios";
import store from "./store.config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token from Redux (safely)
axiosInstance.interceptors.request.use((config) => {
  try {
    const state = store.getState();
    const token = state?.auth?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.warn("Failed to attach token to headers:", error);
  }

  return config;
});

// ✅ Handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ERR_BAD_REQUEST" && error.response?.data) {
      throw error.response.data;
    }

    console.error("ResponseInterceptor:", error);
    throw error;
  }
);

export default axiosInstance;

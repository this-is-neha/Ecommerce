import axios from "axios";
const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:30000,
    timeoutErrorMessage:"Server timed out",
    headers:{
        "Content-Type":"application/json"
    }
})
axiosInstance.interceptors.response.use((response)=>{

return response.data
},(exception)=>{
    if(exception.code==='ERR_BAD_REQUEST'){
        throw exception.response.data
    }
    else{
        console.log("ResponseIntecep:",exception)
        throw exception
    
    }
    
})
export default axiosInstance
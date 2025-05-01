import React from "react"

const LoadingComponent=({customClass=null}:{customClass?:null|string})=>{
return (<>
<div className={`flex h-screen items-center justify-center ${customClass}`}>
    <div className="flex flex-col items-center">
    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
</div>
</div>

</>)
}
export default LoadingComponent 
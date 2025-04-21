import React from "react"
import { ReactNode } from "react"

export interface ChildrenProps{
    children:ReactNode,
    classes?:null|string
}
export const HomeSectionTitle =({children,classes=null}:ChildrenProps)=>{
    return (
        <>
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6  lg:max-w-7xl lg:px-8">
  <h2 className={`text-2xl font-bold tracking-tight text-gray-900 ${classes}`}>
    
 {children}
    </h2>       
        </div>

        </>
    )
}
export default HomeSectionTitle
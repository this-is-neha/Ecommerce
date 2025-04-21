
import { Outlet } from "react-router-dom"
import { FooterComponent,HeaderComponent } from "../../components/common"
import React from "react"
const HomeLayout=()=>{
    return(
        <>  <HeaderComponent/>
        <Outlet/>
        <FooterComponent/>
        </>
    )
}
export default HomeLayout
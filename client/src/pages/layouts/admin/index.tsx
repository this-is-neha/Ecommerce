import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  Dialog,
  DialogPanel,
  
} from '@headlessui/react'
import { FaGear  } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'
import { HiBars3 } from 'react-icons/hi2'
import { FaImages } from 'react-icons/fa6'
import { HiXMark } from 'react-icons/hi2'
import React from 'react'

const AdminLayout=()=>{
    const [mobileMenuOpen,setMobileMenuOpen]=useState(false)
    return <>
 

    <div className="flex">


  <div className="flex h-screen w-full flex-col justify-between px-20 py-10">
 <Outlet/>
  </div>

</div>
    
    </>
}
export default AdminLayout
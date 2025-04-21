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
  {/* <div className="flex h-screen  flex-col justify-between  bg-gray-800">
    <div>

      <div className="border-t border-gray-100">
        <div className="px-2">
          <div className="py-4">
            <a
              href="#"
              className="t group relative flex justify-center rounded bg-blue-50 px-86 py-1.5 text-blue-700"
            >
              <FaGear/>

              <span
                className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
              >
                Settings
              </span>
            </a>
          </div>

          <ul className="space-y-1 border-t border-gray-100 pt-4">
            <li>
              <NavLink to
                ="/"
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <FaHome/>

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Home
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to
                ="/admin/banners"
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <FaImages/>

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
              Banners
                </span>
              </NavLink>
            </li>


            <li>
              <a
                href="#"
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Billing
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Invoices
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Account
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg- p-2">
     
    </div>
  </div> */}

  <div className="flex h-screen w-full flex-col justify-between px-20 py-10">
 <Outlet/>
  </div>

</div>
    
    </>
}
export default AdminLayout
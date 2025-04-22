
import { ReactNode, useContext, useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react';
import { HiChevronDown } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import MobileMenu from "./mobile-menu.component";
import { AuthContext } from "../../../../src/context/auth.context";
import axiosInstance from "../../../config/axios.config"; 
import { toast } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  section: string; 
  _id: string;
  title: string;
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const HeaderComponent = (): ReactNode => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCategoriess, setLoadingCategoriess] = useState(true);
  const [userName, setUserName] = useState()
  const auth = useContext(AuthContext);
 const navigate=useNavigate()


  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken") || null
      const response = await axiosInstance.get('/auth/me', {
        headers: {
          "Authorization": `Bearer ${token}`, // Ensure space after Bearer
        },
      });
      console.log("Routing page ", response)
      const user = response.result; // Assuming the response structure has a result object
      setUserName(user._id)
   

    }
    catch (exception) {

    }

    finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || null
    if (token) {
      getLoggedInUser()
    }
    else {
      setLoading(false)
    }

  })

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axiosInstance.get("/category", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setCategories(response.result);
      console.log("Categories",response.result)
      const neha=response.result;
      neha.forEach((category) => {
        console.log("Title:", category._id);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories...");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const menCategories = categories.filter(category => category.section === 'Men\'s Fashion');
  const womenCategories = categories.filter(category => category.section === 'Women\'s Fashion');
  const kidsCategories = categories.filter(category => category.section === 'Kid\'s Fashion');
  const electronicsCategories = categories.filter(category => category.section === 'Electronics');
  const miscellanousCategories = categories.filter(category => category.section === 'Miscellanous');
  return (
    <header className="bg-lime-50">
      <nav className="mx-auto flex gap-x-20 max-w-7xl items-left justify-between p-6 mx-16 lg:px-2" aria-label="Global">
      
      <Popover className="relative">
      <PopoverButton 
        onClick={() => navigate('/')}
        className="flex items-center  text-xl font-semibold leading-6 text-gray-900"
      >
        HOME
      </PopoverButton>
    </Popover>
        
        <PopoverGroup className="hidden lg:flex lg:gap-x-2 mx-4">
        
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900">
              MEN'S FASHION
              <HiChevronDown className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-x-[10px]"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-[-10px]"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    menCategories.length > 0 ? (
                      menCategories.map((category) => (
                        <div key={category._id} className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            <NavLink to={`/category/${category._id}`} className="block font-semibold text-gray-900">
                              {category.title}
                            </NavLink>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No categories available</p>
                    )
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          {/* WOMEN'S FASHION */}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900">
              WOMEN'S FASHION
              <HiChevronDown className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    womenCategories.length > 0 ? (
                      womenCategories.map((category) => (
                        <div key={category._id} className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            <NavLink to={`/category/${category._id}`} className="block font-semibold text-gray-900">
                              {category.title}
                            </NavLink>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No categories available</p>
                    )
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          {/* KID'S FASHION */}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900">
              KID'S FASHION
              <HiChevronDown className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    kidsCategories.length > 0 ? (
                      kidsCategories.map((category) => (
                        <div key={category._id} className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            <NavLink to={`/category/${category._id}`} className="block font-semibold text-gray-900">
                              {category.title}
                            </NavLink>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No categories available</p>
                    )
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900">
              ELECTRONICS
              <HiChevronDown className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    electronicsCategories.length > 0 ? (
                      electronicsCategories.map((category) => (
                        <div key={category._id} className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            <NavLink to={`/category/${category._id}`} className="block font-semibold text-gray-900">
                              {category.title}
                            </NavLink>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No categories available</p>
                    )
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>


          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-m font-semibold leading-6 text-gray-900">
              MICELLANOUS
              <HiChevronDown className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {loadingCategories ? (
                    <p>Loading categories...</p>
                  ) : (
                    miscellanousCategories.length > 0 ? (
                      miscellanousCategories.map((category) => (
                        <div key={category._id} className="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-m leading-6 hover:bg-gray-50">
                          <div className="flex-auto">
                            <NavLink to={`/category/${category._id}`} className="block font-semibold text-gray-900">
                              {category.title}
                            </NavLink>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No categories available</p>
                    )
                  )}
                </div>

              </PopoverPanel>
            </Transition>
          </Popover>


        </PopoverGroup>

      

<div className="hidden lg:flex lg:flex-1 lg:justify-end">
  {
    auth.loggedInUser ? (
      <>
        <div className="external-space"></div>
        <div className="external-space"></div>
        <div className="external-space"></div>
        {/* Show user icon instead of name */}
        <NavLink to={'/' + auth.loggedInUser.role+`/${auth?.loggedInUser.name}/details`} className="text-m font-semibold leading-6 text-gray-900">
          <i className="fas fa-user text-center text-gray-800 text-3xl"></i>
        
        </NavLink>
        <div className="external-space"></div>
        <div className="external-space"></div>
     
      </>
    ) : (
      <>
        
        <NavLink to="/login" className="text-m font-semibold leading-6 text-gray-900">
          LogIn <span aria-hidden="true">&rarr;</span>
        </NavLink>
        <NavLink to="/register" className="text-m font-semibold leading-6 px-5 text-gray-900">
          Register <span aria-hidden="true">&rarr;</span>
        </NavLink>
   
      </>
    )
  }
</div>

      </nav>
    
      <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} categories={categories} loadingCategories={loadingCategories} />
    </header>
  );
};

export default HeaderComponent;

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}


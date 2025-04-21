import { lazy, useState, useEffect, useContext } from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing/landing.page";
import LoginPage from "../pages/auth/login/index";
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import HomeLayout from "../pages/layouts";
import RegisterPage from "../pages/auth/Register";
import PermissionConfig from "./permission.config";
import { Suspense } from "react";
const AdminDashboard = lazy(() => import("../pages/dashboard/admin.dashboard.page"))
import axiosInstance from "./axios.config"
import {AuthContext }from "../context/auth.context";
import { LoadingComponent } from "../components/common";
import { AdminBanner, AdminBannerCreate, AdminBannerEdit } from "../pages/banner";
import { AdminBrandCreate, AdminBrandEdit, AdminBrand } from "../pages/brand";
import { AdminCategoryCreate, AdminCategoryEdit, AdminCategoryList } from "../pages/category";
import { AdminProductCreate, AdminProductEdit, AdminProductList } from "../pages/product";
import Activate from "../pages/auth/activate"
import CategoryProductList from "../pages/category-product.tsx"
import BrandProductList from "../pages/brand-product";
const AdminLayout = lazy(() => import("../pages/layouts/admin"))
import ProductOrderPage from "../pages/payment";
import PaymentPage from "../pages/paisa";
import ImageUploadPage from "../pages/esewascan"
import OrderListPage from "../pages/list oorders"
import OrderDetails from "../pages/orderrDetails";
import AdminPage from "../pages/admin";
import PaymentSuccessPage from "../components/neha";
import CartPage from "../pages/auth/AddToCart";
import React from "react";
import UserDetails from "../pages/Use Details";
import UserOrders from "../pages/INDIVIDUAL ORDERS";
const RoutingConfig = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true)
    const auth = useContext(AuthContext)
    console.log(auth)
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
            console.log("User Name:", user.name); // Log the user's name
            console.log("User ID:", user._id)
            // auth.setLoggedInUser(response)

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
    return (<>
        {
            loading ? <>

                <LoadingComponent />
            </> : <>
                <AuthContext.Provider value={{ loggedInuser: loggedInUser }}>
                    <ToastContainer
                        theme="colored" />
                    <Routes>
                        <Route path="/" element={<HomeLayout />}>
                            <Route index element={<LandingPage />}></Route>
                            <Route path="login" element={<LoginPage />}></Route>
                            <Route path="register" element={<RegisterPage />}></Route>
                            <Route path="*" element={<>Error page</>}></Route>
                        </Route>
                        <Route path="/admin" element={<PermissionConfig
                            allowAccess={"admin"} ><AdminLayout />
                        </PermissionConfig>}>
                            <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
                            </Suspense>}></Route>
                            <Route path="banner" element={<Suspense fallback={<LoadingComponent />}> <AdminBanner /></Suspense>}></Route>
                            <Route path="banner/create" element={<Suspense fallback={<LoadingComponent />}><AdminBannerCreate /></Suspense>}></Route>
                            <Route path="banner/:id" element={<Suspense fallback={<LoadingComponent />}><AdminBannerEdit /></Suspense>}></Route>
                            <Route path="*" element={<>Error Page</>}></Route>
                        </Route>
                        <Route path="/admin" element={<PermissionConfig
                            allowAccess={"admin"} ><AdminLayout />
                        </PermissionConfig>}>
                            <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
                            </Suspense>}></Route>
                            <Route path="brand" element={<Suspense fallback={<LoadingComponent />}> <AdminBrand /></Suspense>}></Route>
                            <Route path="brand/create" element={<Suspense fallback={<LoadingComponent />}><AdminBrandCreate /></Suspense>}></Route>
                            <Route path="brand/:id" element={<Suspense fallback={<LoadingComponent />}><AdminBrandEdit /></Suspense>}></Route>
                            <Route path="*" element={<>Error Page</>}></Route>
                        </Route>
                        <Route path="/admin" element={<PermissionConfig
                            allowAccess={"admin"} ><AdminLayout />
                        </PermissionConfig>}>
                            <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
                            </Suspense>}></Route>
                            <Route path="category" element={<Suspense fallback={<LoadingComponent />}> <AdminCategoryList /></Suspense>}></Route>
                            <Route path="category/create" element={<Suspense fallback={<LoadingComponent />}><AdminCategoryCreate /></Suspense>}></Route>
                            <Route path="category/:id" element={<Suspense fallback={<LoadingComponent />}><AdminCategoryEdit /></Suspense>}></Route>
                            <Route path="*" element={<>Error Page</>}></Route>
                        </Route>
                        <Route path="/admin" element={<PermissionConfig
                            allowAccess={"admin"} ><AdminLayout />
                        </PermissionConfig>}>
                            <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
                            </Suspense>}></Route>

                            <Route path="product" element={<Suspense fallback={<LoadingComponent />}> <AdminProductList /></Suspense>}></Route>
                            <Route path="product/create" element={<Suspense fallback={<LoadingComponent />}><AdminProductCreate /></Suspense>}></Route>
                            <Route path="product/:id" element={<Suspense fallback={<LoadingComponent />}><AdminProductEdit /></Suspense>}></Route>

                            <Route path="*" element={<>Error Page</>}></Route>
                        </Route>
                        <Route path="/activate" element={<Activate />}>c
                        </Route>
                        <Route path="/category/:categoryId" element={<CategoryProductList />} />
                        <Route path="/brand/:brandId" element={<BrandProductList />} />

                        <Route path="/:productName/:productId/order" element={<ProductOrderPage />} />
                     
                        <Route path="/:productName/:productId/order/payment/:orderId" element={<ImageUploadPage />} />

                        <Route path="/:id/cart" element={<CartPage/>} />
                        <Route path="/admin" element={<PermissionConfig
                            allowAccess={"admin"} ><AdminLayout />
                        </PermissionConfig>}>
                            <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
                            </Suspense>}></Route>

                            <Route path="orderlist" element={<Suspense fallback={<LoadingComponent />}> <OrderListPage /></Suspense>}></Route>
           
                            <Route path="orderlist/:orderId" element={<OrderDetails />} />


                            <Route path="*" element={<>Error Page</>}></Route>
                        </Route>


                     <Route path="/admin/page" element={<AdminPage />}></Route>
                        <Route path="/:userrole/:username/details" element={<UserDetails />}></Route>
                        
                        <Route path="admin/orderlist/:orderId/payment-success" element={<PaymentSuccessPage />}></Route>
                           <Route path="/:productName/:productId/order/payment" element={<PaymentPage />} />
                           <Route path="/:userId/orders" element={<UserOrders />} />
                    </Routes>
               

                </AuthContext.Provider>
            </>
        }
    </>
    )
}

export default RoutingConfig


// import { lazy, useState, useEffect, useContext } from "react"
// import { Routes, Route } from "react-router-dom"
// import LandingPage from "../pages/landing/landing.page";
// import LoginPage from "../pages/auth/login/index";
// import { ToastContainer } from "react-toastify"
// import "react-toastify/ReactToastify.css"
// import HomeLayout from "../pages/layouts";
// import RegisterPage from "../pages/auth/Register";
// import PermissionConfig from "./permission.config";
// import { Suspense } from "react";
// const AdminDashboard = lazy(() => import("../pages/dashboard/admin.dashboard.page"))
// import axiosInstance from "./axios.config"
// import {AuthContext }from "../context/auth.context";
// import { LoadingComponent } from "../components/common";
// import { AdminBanner, AdminBannerCreate, AdminBannerEdit } from "../pages/banner";
// import { AdminBrandCreate, AdminBrandEdit, AdminBrand } from "../pages/brand";
// import { AdminCategoryCreate, AdminCategoryEdit, AdminCategoryList } from "../pages/category";
// import { AdminProductCreate, AdminProductEdit, AdminProductList } from "../pages/product";
// import Activate from "../pages/auth/activate"
// import CategoryProductList from "../pages/category-product.tsx"
// import BrandProductList from "../pages/brand-product";
// const AdminLayout = lazy(() => import("../pages/layouts/admin"))
// import ProductOrderPage from "../pages/payment";
// import PaymentPage from "../pages/paisa";
// import ImageUploadPage from "../pages/esewascan"
// import OrderListPage from "../pages/list oorders"
// import OrderDetails from "../pages/orderrDetails";
// import AdminPage from "../pages/admin";
// import PaymentSuccessPage from "../components/neha";
// import CartPage from "../pages/auth/AddToCart";

// import UserDetails from "../pages/Use Details";
// import UserOrders from "../pages/INDIVIDUAL ORDERS";
// import Reactivate from "../pages/auth/Reactivate";
// import ChangePassword from "../pages/auth/Reset";
// import OrderDetail from "../pages/orderDetails";
// const RoutingConfig = () => {
//     const [loggedInUser, setLoggedInUser] = useState<undefined | null | any>(undefined);
//     const [loading, setLoading] = useState(true)
//     const auth = useContext(AuthContext)
//     console.log(auth)
  
//     const getLoggedInUser = async () => {
//         try {
//             const token = localStorage.getItem("accessToken") || null;
//             const response = await axiosInstance.get("/auth/me", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
    
//             const user = response.data.result;
//             setLoggedInUser(user);
//             console.log("User Name:", user.name);
//             console.log("User ID:", user._id);
//         } catch (error: any) {
//             // 🔥 This is the important part!
//             if (error.response?.status === 401) {
//                 localStorage.removeItem("accessToken");
//                 setLoggedInUser(null); // logout user
//             } else {
//                 console.error("Unexpected error while checking auth:", error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     useEffect(() => {
//         const token = localStorage.getItem("accessToken") || null
//         if (token) {
//             getLoggedInUser()
//         }
//         else {
//             setLoading(false)
//         }

//     })
//     return (<>
//         {
//             loading ? <>

//                 <LoadingComponent />
//             </> : <>
//                 <AuthContext.Provider value={{ loggedInUser: loggedInUser }}>
//                     <ToastContainer
//                         theme="colored" />
//                     <Routes>
//                         <Route path="/" element={<HomeLayout />}>
//                             <Route index element={<LandingPage />}></Route>
//                             <Route path="login" element={<LoginPage />}></Route>
//                             <Route path="register" element={<RegisterPage />}></Route>
//                             <Route path="*" element={<>Error page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>
//                             <Route path="banner" element={<Suspense fallback={<LoadingComponent />}> <AdminBanner /></Suspense>}></Route>
//                             <Route path="banner/create" element={<Suspense fallback={<LoadingComponent />}><AdminBannerCreate /></Suspense>}></Route>
//                             <Route path="banner/:id" element={<Suspense fallback={<LoadingComponent />}><AdminBannerEdit /></Suspense>}></Route>
//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>
//                             <Route path="brand" element={<Suspense fallback={<LoadingComponent />}> <AdminBrand /></Suspense>}></Route>
//                             <Route path="brand/create" element={<Suspense fallback={<LoadingComponent />}><AdminBrandCreate /></Suspense>}></Route>
//                             <Route path="brand/:id" element={<Suspense fallback={<LoadingComponent />}><AdminBrandEdit /></Suspense>}></Route>
//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>
//                             <Route path="category" element={<Suspense fallback={<LoadingComponent />}> <AdminCategoryList /></Suspense>}></Route>
//                             <Route path="category/create" element={<Suspense fallback={<LoadingComponent />}><AdminCategoryCreate /></Suspense>}></Route>
//                             <Route path="category/:id" element={<Suspense fallback={<LoadingComponent />}><AdminCategoryEdit /></Suspense>}></Route>
//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>

//                             <Route path="product" element={<Suspense fallback={<LoadingComponent />}> <AdminProductList /></Suspense>}></Route>
//                             <Route path="product/create" element={<Suspense fallback={<LoadingComponent />}><AdminProductCreate /></Suspense>}></Route>
//                             <Route path="product/:id" element={<Suspense fallback={<LoadingComponent />}><AdminProductEdit /></Suspense>}></Route>

//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/activate" element={<Activate />}>c
//                         </Route>
//                         <Route path="/category/:categoryId" element={<CategoryProductList />} />
//                         <Route path="/brand/:brandId" element={<BrandProductList />} />

//                         <Route path="/:productName/:productId/order" element={<ProductOrderPage />} />
                     
//                         <Route path="/:productName/:productId/order/payment/:orderId" element={<ImageUploadPage />} />

//                         <Route path="/:id/cart" element={<CartPage/>} />
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>

//                             <Route path="orderlist" element={<Suspense fallback={<LoadingComponent />}> <OrderListPage /></Suspense>}></Route>
           
//                             <Route path="orderlist/:orderId" element={<OrderDetails />} />
//                             <Route path="orderlist/order-details/:productId" element={<OrderDetail />} />



//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>


//                      <Route path="/admin/page" element={<AdminPage />}></Route>
//                         <Route path="/:userrole/:username/details" element={<UserDetails />}></Route>
//                         <Route path="/reset-password" element={<ChangePassword />}></Route>
//                         <Route path="/reactivate" element={<Reactivate />}></Route>
//                         <Route path="admin/orderlist/:orderId/payment-success" element={<PaymentSuccessPage />}></Route>
//                            <Route path="/:productName/:productId/order/payment" element={<PaymentPage />} />
//                            <Route path="/:userId/orders" element={<UserOrders />} />
//                     </Routes>
               

//                 </AuthContext.Provider>
//             </>
//         }
//     </>
//     )
// }

// export default RoutingConfig



// import { lazy, useState, useEffect, useContext } from "react"
// import { Routes, Route } from "react-router-dom"
// import LandingPage from "../pages/landing/landing.page";
// import LoginPage from "../pages/auth/login/index";
// import { ToastContainer } from "react-toastify"
// import "react-toastify/ReactToastify.css"
// import HomeLayout from "../pages/layouts";
// import RegisterPage from "../pages/auth/Register";
// import PermissionConfig from "./permission.config";
// import { Suspense } from "react";
// const AdminDashboard = lazy(() => import("../pages/dashboard/admin.dashboard.page"))
// import axiosInstance from "./axios.config"
// import {AuthContext }from "../context/auth.context";
// import { LoadingComponent } from "../components/common";
// import { AdminBanner, AdminBannerCreate, AdminBannerEdit } from "../pages/banner";
// import { AdminBrandCreate, AdminBrandEdit, AdminBrand } from "../pages/brand";
// import { AdminCategoryCreate, AdminCategoryEdit, AdminCategoryList } from "../pages/category";
// import { AdminProductCreate, AdminProductEdit, AdminProductList } from "../pages/product";
// import Activate from "../pages/auth/activate"
// import CategoryProductList from "../pages/category-product.tsx"
// import BrandProductList from "../pages/brand-product";
// const AdminLayout = lazy(() => import("../pages/layouts/admin"))
// import ProductOrderPage from "../pages/payment";
// import PaymentPage from "../pages/paisa";
// import ImageUploadPage from "../pages/esewascan"
// import OrderListPage from "../pages/list oorders"
// import OrderDetails from "../pages/orderrDetails";
// import AdminPage from "../pages/admin";
// import PaymentSuccessPage from "../components/neha";
// import CartPage from "../pages/auth/AddToCart";

// import UserDetails from "../pages/Use Details";
// import UserOrders from "../pages/INDIVIDUAL ORDERS";
// import Reactivate from "../pages/auth/Reactivate";
// import ChangePassword from "../pages/auth/Reset";
// import OrderDetail from "../pages/orderDetails";
// const RoutingConfig = () => {
//     const [loggedInUser, setLoggedInUser] = useState<undefined | null | any>(undefined);
//     const [loading, setLoading] = useState(true)
//     const auth = useContext(AuthContext)
//     console.log(auth)
  
//     const getLoggedInUser = async () => {
//         try {
//             const token = localStorage.getItem("accessToken") || null;
//             const response = await axiosInstance.get("/auth/me", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
    
//             const user = response.data.result;
//             setLoggedInUser(user);
//             console.log("User Name:", user.name);
//             console.log("User ID:", user._id);
//         } catch (error: any) {
//             // 🔥 This is the important part!
//             if (error.response?.status === 401) {
//                 localStorage.removeItem("accessToken");
//                 setLoggedInUser(null); // logout user
//             } else {
//                 console.error("Unexpected error while checking auth:", error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     useEffect(() => {
//         const token = localStorage.getItem("accessToken") || null
//         if (token) {
//             getLoggedInUser()
//         }
//         else {
//             setLoading(false)
//         }

//     })
//     return (<>
//         {
//             loading ? <>

//                 <LoadingComponent />
//             </> : <>
//                 <AuthContext.Provider value={{ loggedInuser: loggedInUser }}>
//                     <ToastContainer
//                         theme="colored" />
//                     <Routes>
//                         <Route path="/" element={<HomeLayout />}>
//                             <Route index element={<LandingPage />}></Route>
//                             <Route path="login" element={<LoginPage />}></Route>
//                             <Route path="register" element={<RegisterPage />}></Route>
//                             <Route path="*" element={<>Error page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>
//                             <Route path="banner" element={<Suspense fallback={<LoadingComponent />}> <AdminBanner /></Suspense>}></Route>
//                             <Route path="banner/create" element={<Suspense fallback={<LoadingComponent />}><AdminBannerCreate /></Suspense>}></Route>
//                             <Route path="banner/:id" element={<Suspense fallback={<LoadingComponent />}><AdminBannerEdit /></Suspense>}></Route>
//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>
//                             <Route path="brand" element={<Suspense fallback={<LoadingComponent />}> <AdminBrand /></Suspense>}></Route>
//                             <Route path="brand/create" element={<Suspense fallback={<LoadingComponent />}><AdminBrandCreate /></Suspense>}></Route>
//                             <Route path="brand/:id" element={<Suspense fallback={<LoadingComponent />}><AdminBrandEdit /></Suspense>}></Route>
//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>
//                             <Route path="category" element={<Suspense fallback={<LoadingComponent />}> <AdminCategoryList /></Suspense>}></Route>
//                             <Route path="category/create" element={<Suspense fallback={<LoadingComponent />}><AdminCategoryCreate /></Suspense>}></Route>
//                             <Route path="category/:id" element={<Suspense fallback={<LoadingComponent />}><AdminCategoryEdit /></Suspense>}></Route>
//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>

//                             <Route path="product" element={<Suspense fallback={<LoadingComponent />}> <AdminProductList /></Suspense>}></Route>
//                             <Route path="product/create" element={<Suspense fallback={<LoadingComponent />}><AdminProductCreate /></Suspense>}></Route>
//                             <Route path="product/:id" element={<Suspense fallback={<LoadingComponent />}><AdminProductEdit /></Suspense>}></Route>

//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>
//                         <Route path="/activate" element={<Activate />}>c
//                         </Route>
//                         <Route path="/category/:categoryId" element={<CategoryProductList />} />
//                         <Route path="/brand/:brandId" element={<BrandProductList />} />

//                         <Route path="/:productName/:productId/order" element={<ProductOrderPage />} />
                     
//                         <Route path="/:productName/:productId/order/payment/:orderId" element={<ImageUploadPage />} />

//                         <Route path="/:id/cart" element={<CartPage/>} />
//                         <Route path="/admin" element={<PermissionConfig
//                             allowAccess={"admin"} ><AdminLayout />
//                         </PermissionConfig>}>
//                             <Route index element={<Suspense fallback={<LoadingComponent />}><AdminDashboard />
//                             </Suspense>}></Route>

//                             <Route path="orderlist" element={<Suspense fallback={<LoadingComponent />}> <OrderListPage /></Suspense>}></Route>
           
//                             <Route path="orderlist/:orderId" element={<OrderDetails />} />
//                             <Route path="orderlist/order-details/:productId" element={<OrderDetail />} />



//                             <Route path="*" element={<>Error Page</>}></Route>
//                         </Route>


//                      <Route path="/admin/page" element={<AdminPage />}></Route>
//                         <Route path="/:userrole/:username/details" element={<UserDetails />}></Route>
//                         <Route path="/reset-password" element={<ChangePassword />}></Route>
//                         <Route path="/reactivate" element={<Reactivate />}></Route>
//                         <Route path="admin/orderlist/:orderId/payment-success" element={<PaymentSuccessPage />}></Route>
//                            <Route path="/:productName/:productId/order/payment" element={<PaymentPage />} />
//                            <Route path="/:userId/orders" element={<UserOrders />} />
//                     </Routes>
               

//                 </AuthContext.Provider>
//             </>
//         }
//     </>
//     )
// }

// export default RoutingConfig



import { lazy, useState, useEffect, useContext, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/landing.page";
import LoginPage from "../pages/auth/login/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import HomeLayout from "../pages/layouts";
import RegisterPage from "../pages/auth/Register";
import PermissionConfig from "./permission.config";
import axiosInstance from "./axios.config";
import { AuthContext } from "../context/auth.context";
import { LoadingComponent } from "../components/common";
import {
  AdminBanner,
  AdminBannerCreate,
  AdminBannerEdit,
} from "../pages/banner";
import { AdminBrandCreate, AdminBrandEdit, AdminBrand } from "../pages/brand";
import {
  AdminCategoryCreate,
  AdminCategoryEdit,
  AdminCategoryList,
} from "../pages/category";
import {
  AdminProductCreate,
  AdminProductEdit,
  AdminProductList,
} from "../pages/product";
import Activate from "../pages/auth/activate";
import CategoryProductList from "../pages/category-product.tsx";
import BrandProductList from "../pages/brand-product";
const AdminDashboard = lazy(() =>
  import("../pages/dashboard/admin.dashboard.page")
);
const AdminLayout = lazy(() => import("../pages/layouts/admin"));
import ProductOrderPage from "../pages/payment";
import PaymentPage from "../pages/paisa";
import ImageUploadPage from "../pages/esewascan";
import OrderListPage from "../pages/list oorders";
import OrderDetails from "../pages/orderrDetails";
import AdminPage from "../pages/admin";
import PaymentSuccessPage from "../components/neha";
import CartPage from "../pages/auth/AddToCart";
import UserDetails from "../pages/Use Details";
import UserOrders from "../pages/INDIVIDUAL ORDERS";
import Reactivate from "../pages/auth/Reactivate";
import ChangePassword from "../pages/auth/Reset";
import OrderDetail from "../pages/orderDetails";

const RoutingConfig = () => {
  const [loggedInUser, setLoggedInUser] = useState<undefined | null | any>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  console.log(auth);

  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");
  
      const response = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,  // not inside headers
      });
      
      const user = response.data.result;
      setLoggedInUser(user);
    } catch (error:any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken"); 
        setLoggedInUser(null);
      } else {
        console.error("Unexpected error fetching logged-in user:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || null;
    if (token) {
      getLoggedInUser();
    } else {
      setLoading(false);
    }
  }, []); // Run only once on mount

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <ToastContainer theme="colored" />
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="*" element={<>Error page</>} />
            </Route>

            <Route
              path="/admin"
              element={
                <PermissionConfig allowAccess={"admin"}>
                  <AdminLayout />
                </PermissionConfig>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="banner"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminBanner />
                  </Suspense>
                }
              />
              <Route
                path="banner/create"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminBannerCreate />
                  </Suspense>
                }
              />
              <Route
                path="banner/:id"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminBannerEdit />
                  </Suspense>
                }
              />
              <Route
                path="brand"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminBrand />
                  </Suspense>
                }
              />
              <Route
                path="brand/create"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminBrandCreate />
                  </Suspense>
                }
              />
              <Route
                path="brand/:id"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminBrandEdit />
                  </Suspense>
                }
              />
              <Route
                path="category"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminCategoryList />
                  </Suspense>
                }
              />
              <Route
                path="category/create"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminCategoryCreate />
                  </Suspense>
                }
              />
              <Route
                path="category/:id"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminCategoryEdit />
                  </Suspense>
                }
              />
              <Route
                path="product"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminProductList />
                  </Suspense>
                }
              />
              <Route
                path="product/create"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminProductCreate />
                  </Suspense>
                }
              />
              <Route
                path="product/:id"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <AdminProductEdit />
                  </Suspense>
                }
              />
              <Route
                path="orderlist"
                element={
                  <Suspense fallback={<LoadingComponent />}>
                    <OrderListPage />
                  </Suspense>
                }
              />
              <Route path="orderlist/:orderId" element={<OrderDetails />} />
              <Route
                path="orderlist/order-details/:productId"
                element={<OrderDetail />}
              />

              <Route path="*" element={<>Error Page</>} />
            </Route>

            <Route path="/activate" element={<Activate />} />
            <Route path="/category/:categoryId" element={<CategoryProductList />} />
            <Route path="/brand/:brandId" element={<BrandProductList />} />
            <Route path="/:productName/:productId/order" element={<ProductOrderPage />} />
            <Route path="/:productName/:productId/order/payment/:orderId" element={<ImageUploadPage />} />
            <Route path="/:id/cart" element={<CartPage />} />
            <Route path="/admin/page" element={<AdminPage />} />
            <Route path="/:userrole/:username/details" element={<UserDetails />} />
            <Route path="/reset-password" element={<ChangePassword />} />
            <Route path="/reactivate" element={<Reactivate />} />
            <Route
              path="admin/orderlist/:orderId/payment-success"
              element={<PaymentSuccessPage />}
            />
            <Route path="/:productName/:productId/order/payment" element={<PaymentPage />} />
            <Route path="/:userId/orders" element={<UserOrders />} />
          </Routes>
        </AuthContext.Provider>
      )}
    </>
  );
};
export default RoutingConfig;
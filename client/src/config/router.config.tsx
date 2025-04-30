
import { lazy, useState, useEffect, useContext, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/landing.page";
import LoginPage from "../pages/auth/login/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import HomeLayout from "../pages/layouts";
import RegisterPage from "../pages/auth/Register";

import axiosInstance from "axios";
import { AuthContext } from "../context/auth.context";
import { LoadingComponent } from "../components/common";

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
const baseURLl = import.meta.env.VITE_API_BASE_URL;
const RoutingConfig = () => {
  const [loggedInUser, setLoggedInUser] = useState<undefined | null | any>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  console.log(auth);



   
  const getLoggedInUser = async () => {
    try {
        const token = localStorage.getItem("accessToken") || null;
        const response = await axiosInstance.get(`${baseURLl}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
console.log("Responsesss:", response); 
        
        if (response.data.data.result) {
            const user = response.data.data.result;
            setLoggedInUser(user);
            console.log("User Name:", user.name);
        } else {
            console.error("No result data found in response:", response);
            setLoggedInUser(null); 
        }
    } catch (exception) {
        console.error("Error fetching user details:", exception);
        setLoggedInUser(null); 
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    const token = localStorage.getItem("accessToken") 
    if (token) {
      getLoggedInUser();
    } else {
      setLoading(false);
    }
  }, []); 

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
                
                  <AdminLayout />
             
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

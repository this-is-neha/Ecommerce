// import  { useContext, useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { TextInputField } from "../../../components/common/form";
// import axiosInstance from "axios";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {AuthContext} from "../../../context/auth.context";
// import { FooterComponent, HeaderComponent } from "../../../components/common";
// const baseURL = import.meta.env.VITE_API_BASE_URL;
// const LoginPage = () => {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);

//   const loginDto = Yup.object({
//     email: Yup.string().email().required("Email is compulsory"),
//     password: Yup.string().required()
//   });

//   const { control, handleSubmit, getValues, formState: { errors } } = useForm({
//     resolver: yupResolver(loginDto),
//     defaultValues: {
//       email: "",
//       password: ""
//     }
//   });

//   const handleForgotPassword = async () => {
//     try {
//       const email = getValues("email");
//       if (!email) {
//         toast.error("Please enter your email address first.");
//         return;
//       }

//       await axiosInstance.post(`${baseURL}/auth/reset`, { email }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
//       });

//       toast.success("Password reset email sent. Please check your inbox.");


//       navigate("/reactivate");
//     } catch (exception: any) {
//       console.log(exception);
//       toast.error(exception.response?.data?.message || "Cannot send reset email at this moment!");
//     }
//   };

//   const submitForm = async (data: any) => {
//     try {
//       const response = await axiosInstance.post(`${baseURL}/auth/login`, data);

//       localStorage.setItem("accessToken", response.data.result.token.accessToken);
//       localStorage.setItem("refreshToken", response.data.result.token.refreshToken);

//       if (auth) {
//         auth.loggedInUser = response.data.result.detail;
//       }

//       console.log("User Details:");
//       console.log("Name:", response.data.result.detail.name);
//       console.log("Email:", response.data.result.detail.email);
//       console.log("Address:", response.data.result.detail.address);
//       toast.success("Welcome " + response.data.result.detail.name);
//       setShowModal(true);
//       setTimeout(() => {
//         setShowModal(false);
//         navigate("/");
//       }, 3000);
//     } catch (exception: any) {
//       console.log(exception);
//       toast.error(exception.response?.data?.message || "Cannot login at this moment!");
//     }
//   };

 
// useEffect(() => {
//   if (auth?.loggedInUser) {
//     toast.info("You are already logged in");
//     navigate("/" + auth.loggedInUser.role);
//   }
// }, [auth, navigate]);

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
     
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
//           <img
//             className="mx-auto h-10 w-auto mt-10"
//             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//             alt="Your Company"
//           />
//           <h2 className="mt-14 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
//             LOG IN
//           </h2>
//         </div>

//         <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
//             <div>
//               <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <TextInputField
//                   control={control}
//                   type="email"
//                   name="email"
//                   errMsg={errors?.email?.message || ""}
//                   required={true}
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900">
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <button
//                     type="button"
//                     onClick={handleForgotPassword}
//                     className="font-semibold text-indigo-600 hover:text-indigo-500"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <TextInputField
//                   control={control}
//                   type="password"
//                   name="password"
//                   errMsg={errors?.password?.message || ""}
//                   required={true}
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full mt-14 text-xl justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-m font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <p className="mt-10 text-center text-sm text-gray-500">
//             Not a member?{' '}
//             <NavLink to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//               Register your account
//             </NavLink>
//           </p>
//         </div>
//       </div>
//       <br/>
//       <br/>
//       <br/>

//       <br/>
//       <FooterComponent />
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <p className="text-xl font-medium mb-4">Login Successful!</p>
//             <p className="text-gray-700">You have been successfully logged in.</p>
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 inline-block"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default LoginPage;





import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextInputField } from "../../../components/common/form";
import { FooterComponent } from "../../../components/common";
import { HeaderComponent } from "../../../components/common";
import { AuthContext } from "../../../context/auth.context";
import axiosInstance from "../../../config/axios.config";
import { setAuth } from "../../../reducer/authSlice";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const loginSchema = Yup.object({
    email: Yup.string().email().required("Email is compulsory"),
    password: Yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleForgotPassword = async () => {
    try {
      const email = getValues("email");
      if (!email) {
        toast.error("Please enter your email address first.");
        return;
      }

      await axiosInstance.post(`${baseURL}/auth/reset`, { email }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      toast.success("Password reset email sent. Please check your inbox.");
      navigate("/reactivate");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Cannot send reset email right now.");
    }
  };

  const submitForm = async (data: any) => {
    try {
      const response = await axiosInstance.post(`${baseURL}/auth/login`, data);

      const accessToken = response.data.result.token.accessToken;
      const refreshToken = response.data.result.token.refreshToken;
      const user = response.data.result.detail;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

     
      dispatch(setAuth({ accessToken, user }));

      
      if (auth?.setLoggedInUser) {
        auth.setLoggedInUser(user);
      }

      toast.success(`Welcome ${user.name}`);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 3000);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  useEffect(() => {
    if (auth?.loggedInUser) {
      toast.info("You are already logged in");
      navigate(`/${auth.loggedInUser.role}`);
    }
  }, [auth, navigate]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto mt-10"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-14 text-center text-4xl font-bold tracking-tight text-gray-900">
            LOG IN
          </h2>
        </div>

        <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <TextInputField
                  control={control}
                  type="email"
                  name="email"
                  errMsg={errors?.email?.message || ""}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xl font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <TextInputField
                  control={control}
                  type="password"
                  name="password"
                  errMsg={errors?.password?.message || ""}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full mt-14 justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-xl font-semibold text-white hover:bg-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <NavLink to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register your account
            </NavLink>
          </p>
        </div>
      </div>

      <FooterComponent />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-medium mb-4">Login Successful!</p>
            <p className="text-gray-700">You have been successfully logged in.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;

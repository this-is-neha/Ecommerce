

import { useForm } from "react-hook-form";
import { SelectComponent, TextInputField } from "../../../components/common/form";
import * as Yup from "yup";
import axiosInstance from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import {AuthContext} from "../../../context/auth.context";


const baseURL = import.meta.env.VITE_API_BASE_URL;
const RegisterPage = () => {
    const auth = useContext(AuthContext);
    const rules = Yup.object({
        name: Yup.string().min(2).max(40).required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required(),
        role: Yup.string().matches(/^(customer|admin)$/).required(),
        address: Yup.string().required(),
        image: Yup.mixed().required()
    });

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(rules)
    });

    const navigate = useNavigate();
    
    const submitEvent = async (data: any) => {
        console.log("Submitting data:", data);
        
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        
        try {
            const response = await axiosInstance.post(`${baseURL}/auth/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success(response.data.message);
            navigate("/activate");
        } catch (exception:any) {
            console.log("RegisterException:", exception.response.data);
            toast.error("Cannot register at this moment!");
        }
    };

  
    useEffect(() => {
      if (auth?.loggedInUser) {
        toast.info("You are already logged in");
        navigate("/" + auth.loggedInUser.role);
      }
    }, [auth, navigate]);
    

    return (
        <>
            <div className="mx-auto">
                <section className="bg-white">
                    <div className="flex justify-center mt-10">
                        <i className="fas fa-user-tag text-center text-gray-600 text-9xl"></i>
                    </div>
                    <div className="lg:grid lg:grid-cols-12 mt-30">
                        <main className="flex items-center justify-center px-8 sm:px-12 lg:col-span-12 lg:px-16 lg:py-12 xl:col-span-12">
                            <div className="max-w-xl lg:max-w-3xl lg:w-full">
                                <form onSubmit={handleSubmit(submitEvent)} className="mt-20 grid grid-cols-6 gap-6" noValidate={false}>
                                    <div className="col-span-6">
                                        <label htmlFor="FirstName" className="block text-xl font-medium text-gray-700">
                                            Full Name<span className="text-red">*</span>
                                        </label>
                                        <TextInputField
                                            control={control}
                                            name="name"
                                            errMsg={errors?.name?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="Email" className="block text-xl font-medium text-gray-700"> Email </label>
                                        <TextInputField
                                            control={control}
                                            name="email"
                                            type="email"
                                            errMsg={errors?.email?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="Password" className="block text-xl font-medium text-gray-700"> Password </label>
                                        <TextInputField
                                            control={control}
                                            name="password"
                                            type="password"
                                            errMsg={errors?.password?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                            Password Confirmation
                                        </label>
                                        <TextInputField
                                            control={control}
                                            name="confirmPassword"
                                            type="password"
                                            errMsg={errors?.confirmPassword?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="role" className="block text-xl font-medium text-gray-700">
                                            Role
                                        </label>
                                        <SelectComponent
                                            options={[ { label: "Customer", value: "customer" },{ label: "admin", value: "admin" }]}
                                            name="role"
                                            control={control}
                                            errMsg={errors?.role?.message}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="address" className="block text-xl font-medium text-gray-700"> Address </label>
                                        <TextInputField
                                            control={control}
                                            name="address"
                                            errMsg={errors?.address?.message as string}
                                            required={true}
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="image" className="block text-xl font-medium text-gray-700 py-2">
                                            Image
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                                            id="file_input" type="file"
                                            onChange={(e: any) => {
                                                const uploaded = e.target.files[0];
                                                setValue('image', uploaded);
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                        <button
                                            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-xl font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                        >
                                            Create an account
                                        </button>
                                        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                            Already have an account?
                                            <a href="/login" className="text-gray-700 underline">Log in</a>.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </main>
                    </div>
                </section>
            </div>
        </>
    );
};

export default RegisterPage;

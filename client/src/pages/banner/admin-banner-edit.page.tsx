

import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputField, SelectOptionComponent } from "../../components/common/form";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FooterComponent, HeaderComponent, LoadingComponent } from "../../components/common";
import React from "react";

const AdminBannerEdit = () => {
    let [loading, setLoading] = useState(true);
    const params = useParams();
    const [detail, setDetail] = useState({} as any);

    const editDTO = Yup.object({
        title: Yup.string().min(3).required(),
        link: Yup.string().url().nullable(),
        status: Yup.string().oneOf(['active', 'inactive']).required(),
        image: Yup.mixed().required(),
    });

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(editDTO),
    });

    const navigate = useNavigate();

    const submitEvent = async (data: any) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('link', data.link);
            formData.append('status', data.status); // Change here
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }

            await axiosInstance.put('/banner/' + params.id, formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Banner updated successfully");
            navigate("/admin/banner");
        } catch (exception) {
            console.log(exception);
            toast.error("Error updating banner");
        } finally {
            setLoading(false);
        }
    };

    const getBannerById = async () => {
        try {
            const response: any = await axiosInstance.get("/banner/" + params.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });

            setValue("title", response.result.title);
            setValue("link", response.result.link);
            setValue("status", response.result.status);
            setDetail(response.result);
        } catch (exception) {
            toast.error("Banner fetch error");
            navigate('/admin/banner');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBannerById();
    }, [params]);

    return (
        <>
        <HeaderComponent/>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:gap-16">
                        <h1 className="text-6xl font-bold">Banner Edit</h1>
                        <div></div>
                    </div>
                    <div className="rounded-lg border border-gray-200 mt-5">
                        <div className="overflow-x-auto rounded-t-lg">
                            {loading ? (
                                <LoadingComponent />
                            ) : (
                                <form onSubmit={handleSubmit(submitEvent)} className="mt-20 grid grid-cols-6 gap-6">
                                    <div className="col-span-6">
                                        <label htmlFor="title" className="block text-xl font-medium text-gray-700">
                                            Title<span className="text-red">*</span>
                                        </label>
                                        <TextInputField
                                            control={control}
                                            name="title"
                                            errMsg={errors?.title?.message as string}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="link" className="block text-xl font-medium text-gray-700">Link</label>
                                        <TextInputField
                                            control={control}
                                            name="link"
                                            type="url"
                                            errMsg={errors?.link?.message as string}
                                            required={false}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label text-xl font-semibold">Status</label>
                                        <SelectOptionComponent
                                            control={control}
                                            name="status"
                                            options={[
                                                { value: 'active', label: 'active' },
                                                { value: 'inactive', label: 'inactive' }
                                            ]}
                                            errMsg={errors.status?.message || ""}
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="image" className="block text-xl font-medium text-gray-700 py-2">
                                            Image
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                                            id="file_input"
                                            type="file"
                                            onChange={(e: any) => {
                                                const uploaded = e.target.files[0];
                                                setValue('image', uploaded);
                                            }}
                                        />
                                        {detail.image && (
                                            <div className="block w-[24%]">
                                                <img src={import.meta.env.VITE_IMAGE_URL + 'uploads/banners/' + detail.image} alt="Banner" />
                                            </div>
                                        )}
                                        <span className="text-red">{errors?.image?.message}</span>
                                    </div>
                                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                        <button
                                            className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-xl font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-blue-500"
                                            disabled={loading}
                                        >
                                            Edit Banner
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent/>
        </>
    );
};

export default AdminBannerEdit;



import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextInputField, SelectOptionComponent } from "../../components/common/form";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

const AdminBannerCreate = () => {
    const [loading, setLoading] = useState(false);

    const createDTO = Yup.object({
        title: Yup.string().min(3).required(),
        link: Yup.string().url().nullable(),
        status: Yup.string().oneOf(['active', 'inactive']).required(),
        image: Yup.mixed().required(),
    });

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(createDTO)
    });

    const navigate = useNavigate();

    const submitEvent = async (data: any) => {
        try {
            setLoading(true);
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found');
            }

            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('link', data.link);
            formData.append('status', data.status);
            formData.append('image', data.image);

            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            };

            const response = await axiosInstance.post('/banner', formData, { headers });
            toast.success("Banner created successfully");
            navigate("/admin/banner");
        } catch (error: any) {
            console.error("Error creating Banner:", error);
            toast.error(error?.message || "Error creating Banner");
            if (error.response && error.response.data) {
                console.log("Server response:", error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
<>
<HeaderComponent/>


        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:gap-16">
                    <h1 className="text-6xl font-bold">Banner Create</h1>
                    <div></div>
                </div>
                <div className="rounded-lg border border-gray-200 mt-5">
                    <div className="overflow-x-auto rounded-t-lg">
                        <form onSubmit={handleSubmit(submitEvent)}>
                            <div className="space-y-5 p-10">
                                <div className="form-control">
                                    <label className="label text-xl font-semibold">Title</label>
                                    <TextInputField
                                        control={control}
                                        name="title"
                                        type="text"
                                        errMsg={errors.title?.message || ""}
                                        required={true}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-xl font-semibold">Link</label>
                                    <TextInputField
                                        control={control}
                                        name="link"
                                        type="text"
                                        errMsg={errors.link?.message || ""}
                                        required={true}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-xl font-semibold">Status</label>
                                    <SelectOptionComponent
                                        control={control}
                                        name="status"
                                        options={[
                                            { value: 'active', label: 'Active' },
                                            { value: 'inactive', label: 'Inactive' }
                                        ]}
                                        errMsg={errors.status?.message || ""}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label text-xl font-semibold">Image</label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e: any) => setValue('image', e.target.files?.[0])}
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Create Banner"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <FooterComponent/>
        </>
    );
};

export default AdminBannerCreate;

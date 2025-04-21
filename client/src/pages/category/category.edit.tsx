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

const AdminCategoryEdit = () => {
    let [loading, setLoading] = useState(true);
    const params = useParams();
    const [detail, setDetail] = useState({} as any);

    const editDTO = Yup.object({
        title: Yup.string().min(3).required(),
        status: Yup.string().matches(/^(active|inactive)$/).required(),
        section: Yup.string().oneOf(['Men\'s Fashion', 'Women\'s Fashion', 'Kid\'s Fashion', 'Electronics', 'Miscellanous'], 'Invalid section').required('Section is required'),
        image: Yup.mixed().required(),
        parentId: Yup.string().nullable()
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
            formData.append('status', data.status.value);
            if (data.image instanceof File) {
                formData.append('image', data.image);
            }

            formData.append('parentId', data.parentId);
            formData.append('section', data.section ? data.section : '');
            await axiosInstance.put('/category/' + params.id, formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken'),
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Banner updated successfully");
            navigate("/admin/category");
        } catch (exception) {
            console.log(exception);
            toast.error("Error updating Category");
        } finally {
            setLoading(false);
        }
    };

    const getCategoryById = async () => {
        try {
            const response: any = await axiosInstance.get("/category/" + params.id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            });

            setValue("title", response.result.title);
            setValue("parentId", response.result.parentId);
            setValue("status", response.result.status);
            setDetail(response.result);
        } catch (exception) {
            toast.error("Category fetch error");
            navigate('/admin/category');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategoryById();
    }, [params]);

    return (
        <>
        <HeaderComponent/>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:gap-16">
                        <h1 className="text-6xl font-bold">Category Edit</h1>
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
                                        <label className="label text-xl font-semibold">Section</label>
                                        <SelectOptionComponent
                                            control={control}
                                            name="section"
                                            options={[
                                                { value: "Men's Fashion", label: "Men's Fashion" },
                                                { value: "Women's Fashion", label: "Women's Fashion" },
                                                { value: "Kid's Fashion", label: "Kid's Fashion" },
                                                { value: "Electronics", label: "Electronics" },
                                                { value: "Miscellanous", label: "Miscellanous" }
                                            ]}
                                            errMsg={errors.section?.message || ''}
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
                                                <img src={import.meta.env.VITE_IMAGE_URL + 'uploads/category/' + detail.image} alt="Banner" />
                                            </div>
                                        )}
                                        <span className="text-red">{errors?.image?.message}</span>
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="link" className="block text-xl font-medium text-gray-700">ParentId</label>
                                        <SelectOptionComponent
                                            control={control}
                                            name="parentId"
                                            options={[
                                                { value: '', label: 'None' }, // Adjust as per your backend logic for null/empty
                                                { value: 'parent1', label: 'Parent Category 1' },
                                                { value: 'parent2', label: 'Parent Category 2' }
                                                // Add more options dynamically or fetch from API
                                            ]}
                                            errMsg={errors.parentId?.message || ''}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                        <button
                                            className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-xl font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-blue-500"
                                            disabled={loading}
                                        >
                                            Edit Category
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

export default AdminCategoryEdit;


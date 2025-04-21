
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../config/axios.config';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { TextInputField, SelectOptionComponent } from '../../components/common/form';
import React from 'react';
import { FooterComponent, HeaderComponent } from '../../components/common';

const AdminCategoryCreate = () => {
    const [loading, setLoading] = useState(false);

    const createDTO = Yup.object({
        title: Yup.string().min(3).required(),
        status: Yup.string().oneOf(['active', 'inactive']).required(),
        image: Yup.mixed().required(),
        parentId: Yup.string().nullable(),
        section: Yup.string().oneOf(['Men\'s Fashion', 'Women\'s Fashion','Kid\'s Fashion','Electronics','Miscellanous'], 'Invalid section').required('Section is required')
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
            formData.append('status', data.status);
            if (data.image instanceof File) {
                formData.append('image', data.image);
            } else {
                console.log("No image file provided");
            }
            
            formData.append('parentId', data.parentId ? data.parentId : ''); // Send an empty string if parentId is null
            formData.append('section', data.section ? data.section : '');
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            };


            console.log("FormData:", formData);
            formData.forEach((value, key) => console.log(`${key}:`, value));
            const response = await axiosInstance.post('/category', formData, { headers });
            console.log("Category creation response:", response.data); // Log the response
            toast.success('Category created successfully');
            navigate('/admin/category');
        } catch (error: any) {
            console.error('Error creating Category:', error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || 'Error creating Category');
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
                    <h1 className="text-6xl font-bold">Category Create</h1>
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
                                        errMsg={errors.title?.message || ''}
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
                                        errMsg={errors.status?.message || ''}
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


                                <div className="form-control">
                                    <label className="label text-xl font-semibold">Image</label>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e: any) => {
                                            const file = e.target.files?.[0];
                                            setValue('image', file);
                                            if (file) {
                                                console.log("Selected file:", file);
                                            }
                                        }}
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label text-xl font-semibold">Parent Category</label>
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

                                <div>
                                    <button
                                        type="submit"
                                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Category'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
<FooterComponent/></>
    );
};

export default AdminCategoryCreate;



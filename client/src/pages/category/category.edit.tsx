

import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputField, SelectOptionComponent } from "../../components/common/form";
import { useForm } from "react-hook-form";
import axiosInstance from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FooterComponent, HeaderComponent, LoadingComponent } from "../../components/common";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const imageBaseURL = `${baseURL}/uploads/category/`;

const AdminCategoryEdit = () => {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<any>({});
    const [imagePreview, setImagePreview] = useState<string[]>([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const editSchema = Yup.object({
        title: Yup.string().min(3, "Title too short").required("Title is required"),
        status: Yup.string().oneOf(["active", "inactive"]).required("Status is required"),
        section: Yup.string().oneOf(["Men's Fashion", "Women's Fashion", "Kid's Fashion", "Electronics", "Miscellanous"], "Invalid section").required("Section is required"),
        image: Yup.mixed().nullable(),
        parentId: Yup.string().nullable(),
    });

    const { control, handleSubmit, setValue, register, formState: { errors } } = useForm({
        resolver: yupResolver(editSchema),
    });

    // Fetch category data
    const getCategoryById = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            const response: any = await axiosInstance.get(`${baseURL}/category/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const cat = response.data.result;
            setDetail(cat);

            // Set form values
            setValue("title", cat.title || "");
            setValue("status", cat.status || "inactive");
            setValue("section", cat.section || "");
            setValue("parentId", cat.parentId || "");

            // Existing image
            if (cat.image) setImagePreview([`${imageBaseURL}${encodeURIComponent(cat.image)}`]);
        } catch (err) {
            console.error("Error fetching category:", err);
            toast.error("Failed to fetch category");
            navigate("/admin/category");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategoryById();
    }, [id]);

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const uploaded = files[0];
            setValue("image", uploaded);
            setImagePreview([URL.createObjectURL(uploaded)]);
        }
    };

    // Submit updated data
    const submitEvent = async (data: any) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("status", data.status);
            formData.append("section", data.section);
            formData.append("parentId", data.parentId || "");

            if (data.image instanceof File) {
                formData.append("image", data.image);
            }

            await axiosInstance.put(`${baseURL}/category/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Category updated successfully");
            navigate("/admin/category");
        } catch (err: any) {
            console.error("Error updating category:", err.response?.data || err.message);
            toast.error("Failed to update category");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingComponent />;

    return (
        <>
            <HeaderComponent />

            <section className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-6">Edit Category</h1>

                <div className="rounded-lg border border-gray-200 mt-5 p-6 bg-white shadow-md">
                    <form onSubmit={handleSubmit(submitEvent)} className="grid grid-cols-6 gap-6">

                        {/* Title */}
                        <div className="col-span-6">
                            <label className="block text-xl font-medium text-gray-700">Title <span className="text-red">*</span></label>
                            <TextInputField control={control} name="title" errMsg={errors.title?.message || ""} required />
                        </div>

                        {/* Status */}
                        <div className="col-span-6">
                            <label className="block text-xl font-medium text-gray-700">Status</label>
                            <SelectOptionComponent
                                control={control}
                                name="status"
                                options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
                                errMsg={errors.status?.message || ""}
                            />
                        </div>

                        {/* Section */}
                        <div className="col-span-6">
                            <label className="block text-xl font-medium text-gray-700">Section</label>
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
                                errMsg={errors.section?.message || ""}
                            />
                        </div>

                        {/* Parent Category */}
                        <div className="col-span-6">
                            <label className="block text-xl font-medium text-gray-700">Parent Category</label>
                            <SelectOptionComponent
                                control={control}
                                name="parentId"
                                options={[
                                    { value: "", label: "None" },
                                    { value: "parent1", label: "Parent Category 1" },
                                    { value: "parent2", label: "Parent Category 2" },
                                ]}
                                errMsg={errors.parentId?.message || ""}
                            />
                        </div>

                        {/* Image */}
                        <div className="col-span-6">
                            <label className="block text-xl font-medium text-gray-700 py-2">Image</label>
                            <input
                                type="file"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                onChange={handleFileChange}
                            />

                            {/* Preview */}
                            {imagePreview.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {imagePreview.map((imgUrl, index) => (
                                        <div key={index} className="relative w-32 h-32">
                                            <img
                                                src={imgUrl}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover rounded-lg border"
                                                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                                            />
                                            {control._formValues.image instanceof File && (
                                                <button
                                                    type="button"
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-1"
                                                    onClick={() => {
                                                        setValue("image", null);
                                                        setImagePreview([]);
                                                    }}
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <span className="text-red">{errors?.image?.message}</span>
                        </div>

                        {/* Submit */}
                        <div className="col-span-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                                disabled={loading}
                            >
                                Update Category
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <FooterComponent />
        </>
    );
};

export default AdminCategoryEdit;



// import { yupResolver } from "@hookform/resolvers/yup";
// import { TextInputField, SelectOptionComponent } from "../../components/common/form";
// import { set, useForm } from "react-hook-form";
// import axiosInstance from "axios";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FooterComponent, HeaderComponent, LoadingComponent } from "../../components/common";
// const baseURL = import.meta.env.VITE_API_BASE_URL;
// const imageBaseURL = `${baseURL}/uploads/product/`;
// const AdminCategoryEdit = () => {
//     let [loading, setLoading] = useState(true);

//     const [detail, setDetail] = useState({} as any);
//     const { id } = useParams()
//     console.log("ID:", id);
//     const editDTO = Yup.object({
//         title: Yup.string().min(3).required(),
//         status: Yup.string().matches(/^(active|inactive)$/).required(),
//         section: Yup.string().oneOf(['Men\'s Fashion', 'Women\'s Fashion', 'Kid\'s Fashion', 'Electronics', 'Miscellanous'], 'Invalid section').required('Section is required'),
//         image: Yup.mixed().required(),
//         parentId: Yup.string().nullable()
//     });

//     const { control, handleSubmit, setValue, formState: { errors } } = useForm({
//         resolver: yupResolver(editDTO),
//     });

//     const navigate = useNavigate();



//     const submitEvent = async (data: any) => {
//   try {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('title', data.title);
//     formData.append('status', data.status?.value || data.status || '');
//     formData.append('section', data.section?.value || data.section || '');
//     formData.append('parentId', data.parentId || '');

//     if (data.image instanceof File) {
//       formData.append('image', data.image);
//     }

//     // Debug
//     Array.from(formData.entries()).forEach(([key, value]) => {
//       console.log(key, value);
//     });

//     await axiosInstance.put(`${baseURL}/category/${id}`, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     toast.success("Category updated successfully");
//     navigate("/admin/category");
//   } catch (exception: any) {
//     console.log("Error updating category:", exception.response?.data || exception.message);
//     toast.error("Error updating Category");
//   } finally {
//     setLoading(false);
//   }
// };

//     const getCategoryById = async () => {
//         const token = localStorage.getItem("accessToken");
//         console.log("Token:", token);
//         try {
//             const response: any = await axiosInstance.get(`${baseURL}/category/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("Resposne of Cta", response);
//             console.log("Resposne", response.result);
//             setValue("title", response.data.result.title);
//             setValue("parentId", response.data.result.parentId);
//             setValue("status", response.data.result.status);
//             setValue("section", response.data.result.section);
//             setDetail(response.result);
//         } catch (exception) {
//             toast.error("Category fetch error");
//             console.log("Error", exception);
//             navigate('/admin/category');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getCategoryById();
//     }, [id]);

//     return (
//         <>
//             <HeaderComponent />
//             <section>
//                 <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 gap-8 lg:gap-16">
//                         <h1 className="text-6xl font-bold">Category Edit</h1>
//                         <div></div>
//                     </div>
//                     <div className="rounded-lg border border-gray-200 mt-5">
//                         <div className="overflow-x-auto rounded-t-lg">
//                             {loading ? (
//                                 <LoadingComponent />
//                             ) : (
//                                 <form onSubmit={handleSubmit(submitEvent)} className="mt-20 grid grid-cols-6 gap-6">
//                                     <div className="col-span-6">
//                                         <label htmlFor="title" className="block text-xl font-medium text-gray-700">
//                                             Title<span className="text-red">*</span>
//                                         </label>
//                                         <TextInputField
//                                             control={control}
//                                             name="title"
//                                             errMsg={errors?.title?.message as string}
//                                             required={true}
//                                         />
//                                     </div>

//                                     <div className="form-control">
//                                         <label className="label text-xl font-semibold">Status</label>
//                                         <SelectOptionComponent
//                                             control={control}
//                                             name="status"
//                                             options={[
//                                                 { value: 'active', label: 'Active' },
//                                                 { value: 'inactive', label: 'Inactive' }
//                                             ]}
//                                             errMsg={errors.status?.message || ""}
//                                         />
//                                     </div>
//                                     <div className="form-control">
//                                         <label className="label text-xl font-semibold">Section</label>
//                                         <SelectOptionComponent
//                                             control={control}
//                                             name="section"
//                                             options={[
//                                                 { value: "Men's Fashion", label: "Men's Fashion" },
//                                                 { value: "Women's Fashion", label: "Women's Fashion" },
//                                                 { value: "Kid's Fashion", label: "Kid's Fashion" },
//                                                 { value: "Electronics", label: "Electronics" },
//                                                 { value: "Miscellanous", label: "Miscellanous" }
//                                             ]}
//                                             errMsg={errors.section?.message || ''}
//                                         />
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="image" className="block text-xl font-medium text-gray-700 py-2">
//                                             Image
//                                         </label>
//                                         <input
//                                             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
//                                             id="file_input"
//                                             type="file"
//                                             onChange={(e: any) => {
//                                                 const uploaded = e.target.files[0];
//                                                 setValue('image', uploaded);
//                                             }}
//                                         />
//                                         {detail?.image && (
//                                             <div className="block w-[24%]">
//                                                 <img
//                                                     src={import.meta.env.VITE_IMAGE_URL + 'uploads/category/' + detail.image}
//                                                     alt="Banner"
//                                                 />
//                                             </div>
//                                         )}

//                                         <span className="text-red">{errors?.image?.message}</span>
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="link" className="block text-xl font-medium text-gray-700">ParentId</label>
//                                         <SelectOptionComponent
//                                             control={control}
//                                             name="parentId"
//                                             options={[
//                                                 { value: '', label: 'None' }, // Adjust as per your backend logic for null/empty
//                                                 { value: 'parent1', label: 'Parent Category 1' },
//                                                 { value: 'parent2', label: 'Parent Category 2' }
//                                                 // Add more options dynamically or fetch from API
//                                             ]}
//                                             errMsg={errors.parentId?.message || ''}
//                                         />
//                                     </div>
//                                     <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                                         <button
//                                             className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-xl font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-blue-500"
//                                             disabled={loading}
//                                         >
//                                             Edit Category
//                                         </button>
//                                     </div>
//                                 </form>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <FooterComponent />
//         </>
//     );
// };

// export default AdminCategoryEdit;


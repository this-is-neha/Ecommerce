


import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputField, SelectOptionComponent, CheckboxField } from "../../components/common/form";
import { useForm } from "react-hook-form";
import axiosInstance from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FooterComponent, HeaderComponent, LoadingComponent } from "../../components/common";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const imageBaseURL = `${baseURL}/uploads/brands/`;

const AdminBrandEdit = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const editSchema = Yup.object({
    title: Yup.string().min(3, "Title too short").required("Title is required"),
    status: Yup.string().oneOf(["active", "inactive"]).required("Status is required"),
    image: Yup.mixed().nullable(),
    homeSection: Yup.boolean().default(false),
  });

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(editSchema),
  });

  const getBrandById = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response: any = await axiosInstance.get(`${baseURL}/brand/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const brand = response.data.result;
      setDetail(brand);

      setValue("title", brand.title || "");
      setValue("status", brand.status || "inactive");
      setValue("homeSection", brand.homeSection || false);

      if (brand.image) setImagePreview([`${imageBaseURL}${encodeURIComponent(brand.image)}`]);
      console.log("Fetched brand details:", brand.image);
    } catch (err) {
      console.error("Error fetching brand:", err);
      toast.error("Failed to fetch brand");
      navigate("/admin/brand");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrandById();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const uploaded = files[0];
      setValue("image", uploaded);
      setImagePreview([URL.createObjectURL(uploaded)]);
    }
  };

  const submitEvent = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("status", data.status);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (detail.image) {
        formData.append("existingImage", detail.image);
      }

      formData.append("homeSection", data.homeSection ? "true" : "false");

      await axiosInstance.put(`${baseURL}/brand/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Brand updated successfully");
      navigate("/admin/brand");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update brand");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <>
      <HeaderComponent />

      <section className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-4xl font-bold mb-6">Edit Brand</h1>

        <div className="rounded-lg border border-gray-300 mt-5 p-8 bg-white shadow-lg">
          <form onSubmit={handleSubmit(submitEvent)} className="grid grid-cols-6 gap-6">


            <div className="col-span-6">
              <label className="block text-xl font-medium text-gray-700">
                Title <span className="text-red">*</span>
              </label>
              <TextInputField control={control} name="title" errMsg={errors.title?.message || ""} required />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="block text-xl font-medium text-gray-700">Status</label>
              <SelectOptionComponent
                control={control}
                name="status"
                options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
                errMsg={errors.status?.message || ""}
              />
            </div>


            <div className="col-span-6 sm:col-span-3 flex items-center mt-6">
              <CheckboxField control={control} name="homeSection" label="Home Section" checked={false} />
            </div>

            <div className="col-span-6">
              <label className="block text-xl font-medium text-gray-700 py-2">Image</label>
              <input
                type="file"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                onChange={handleFileChange}
              />

              {imagePreview.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {imagePreview.map((imgUrl, index) => (
                    <div key={index} className="relative w-40 h-40">
                      <img
                        src={imgUrl}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-lg border"
                        onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                      />
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
                    </div>
                  ))}
                </div>
              )}

              <span className="text-red">{errors?.image?.message}</span>
            </div>


            <div className="col-span-6 mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 w-full sm:w-auto"
                disabled={loading}
              >
                Update Brand
              </button>
            </div>
          </form>
        </div>
      </section>

      <FooterComponent />
    </>
  );
};

export default AdminBrandEdit;




// import { yupResolver } from "@hookform/resolvers/yup";
// import { TextInputField, SelectOptionComponent, CheckboxField } from "../../components/common/form";
// import { useForm } from "react-hook-form";
// import axiosInstance from "axios";
// import { toast } from "react-toastify";
// import * as Yup from "yup";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FooterComponent, HeaderComponent, LoadingComponent } from "../../components/common";

// const baseURL = import.meta.env.VITE_API_BASE_URL;
// const AdminBrandEdit = () => {
//   const [loading, setLoading] = useState(true);
// const { id } = useParams<{ id: string }>(); // <-- extract the string

//   const [detail, setDetail] = useState<any>({});

//   const editDTO = Yup.object({
//     title: Yup.string().min(3).required(),
//     status: Yup.string().matches(/^(active|inactive)$/).required(),
//     image: Yup.mixed().nullable(),
//     homeSection: Yup.boolean().default(false),
//   });

//   const { control, handleSubmit, setValue, formState: { errors } } = useForm({
//     resolver: yupResolver(editDTO),
//   });

//   const navigate = useNavigate();

//   const submitEvent = async (data: any) => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('title', data.title);
//       formData.append('status', data.status);

//       if (data.image instanceof File) {
//         formData.append('image', data.image);
//       } else if (detail.image) {
//         // Append the existing image if no new image is selected
//         formData.append('existingImage', detail.image);
//       }

//       formData.append('homeSection', data.homeSection ? 'true' : 'false');

//       await axiosInstance.put(`${baseURL}/brand/${id}` , formData, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem('accessToken'),
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Brand updated successfully");
//       navigate("/admin/brand");
//     } catch (exception) {
//       console.log(exception);
//       toast.error("Error updating brand");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getBrandById = async () => {
//     try {
//      console.log('Fetching brand details for ID:', id);
//       const response: any = await axiosInstance.get(`${baseURL}/brand/${id}` , {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("accessToken"),
//           "Content-Type": "application/json",
//         },
//       });

//       setValue("title", response.data.result.title);
//       setValue("status", response.data.result.status);
//       setValue("homeSection", response.data.result.homeSection);

//       setDetail(response.data.result);
//     } catch (exception) {
//       toast.error("Brand fetch error");
//       navigate('/admin/brand');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBrandById();
//   }, [id]);

//   return (
    
//       <>
//       <section>
//       <HeaderComponent/>
    
//       <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-8 lg:gap-16">
//           <h1 className="text-6xl font-bold">Edit Brand</h1>
//         </div>
//         <div className="rounded-lg border border-gray-200 mt-5">
//           <div className="overflow-x-auto rounded-t-lg">
//             {loading ? (
//               <LoadingComponent />
//             ) : (
//               <form onSubmit={handleSubmit(submitEvent)} className="mt-20 grid grid-cols-6 gap-6">
//                 <div className="col-span-6">
//                   <label htmlFor="title" className="block text-xl font-medium text-gray-700">
//                     Title<span className="text-red">*</span>
//                   </label>
//                   <TextInputField
//                     control={control}
//                     name="title"
//                     errMsg={errors?.title?.message as string}
//                     required={true}
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label text-xl font-semibold">Status</label>
//                   <SelectOptionComponent
//                     control={control}
//                     name="status"
//                     options={[
//                       { value: 'active', label: 'Active' },
//                       { value: 'inactive', label: 'Inactive' }
//                     ]}
//                     errMsg={errors.status?.message || ""}
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="image" className="block text-xl font-medium text-gray-700 py-2">
//                     Image
//                   </label>
//                   <input
//                     className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
//                     id="file_input"
//                     type="file"
//                     onChange={(e: any) => {
//                       const uploaded = e.target.files[0];
//                       setValue('image', uploaded);
//                     }}
//                   />
//                   {detail.image && (
//                     <div className="block w-[24%]">
//                       <img src={import.meta.env.VITE_IMAGE_URL + 'uploads/brands/' + detail.image} alt="Brand" />
//                     </div>
//                   )}
//                   <span className="text-red">{errors?.image?.message}</span>
//                 </div>

//                 <div className="col-span-6">
//                   <CheckboxField
//                       control={control}
//                       name="homeSection"
//                       label="Home Section" checked={false}                  />
//                 </div>

//                 <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//                   <button
//                     className="inline-block shrink-0 rounded-md border border-green-700 bg-green-700 px-6 py-2 text-xl font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-blue-500"
//                     disabled={loading}
//                   >
//                     Edit Brand
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//     <FooterComponent/>
//     </>
//   );
// };

// export default AdminBrandEdit;

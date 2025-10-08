
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "axios";
import {
  TextInputField,
  SelectOptionComponent,
} from "../../components/common/form";
import {
  FooterComponent,
  HeaderComponent,
  LoadingComponent,
} from "../../components/common";

const baseURLl = import.meta.env.VITE_API_BASE_URL;
const imageBaseURL = `${baseURLl}/uploads/product/`;

const AdminProductEdit = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [detail, setDetail] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const { productId } = useParams();
  const navigate = useNavigate();

  const updateSchema = Yup.object({
    title: Yup.string().min(3).required("Title is required"),
    summary: Yup.string().required("Summary is required"),
    description: Yup.string().nullable(),
    price: Yup.number().min(100).required("Price is required"),
    discount: Yup.number().min(0).max(90).default(0),
    isFeatured: Yup.boolean().default(false),
    status: Yup.string().oneOf(["active", "inactive"]).default("inactive"),
    categoryId: Yup.string().required("Category is required"),
    brandId: Yup.string().required("Brand is required"),
    slug: Yup.string().required("Slug is required"),
    images: Yup.array()
      .of(
        Yup.mixed().test("fileType", "Must be a file", (value) =>
          value ? value instanceof File : true
        )
      )
      .nullable(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSchema),
  });

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`${baseURLl}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setCategories(response.data.data.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories...");
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get(`${baseURLl}/brand`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setBrands(response.data.data.result);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Error fetching brands...");
    }
  };

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${baseURLl}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const product = response.data.data.result;
      if (!product) throw new Error("Product not found");

      setDetail(product);


      if (product.images && product.images.length > 0) {
        const urls = product.images.map(
          (img: string) => `${imageBaseURL}${encodeURIComponent(img)}`
        );
        setImagePreview(urls);
      }

      setValue("title", product.title || "");
      setValue("summary", product.summary || "");
      setValue("description", product.description || "");
      setValue("price", product.price || 0);
      setValue("discount", product.discount || 0);
      setValue("isFeatured", product.isFeatured || false);
      setValue("status", product.status || "inactive");
      setValue(
        "categoryId",
        Array.isArray(product.categoryId) ? product.categoryId[0] : product.categoryId || ""
      );
      setValue("brandId", product.brandId || "");
      setValue("slug", product.slug || "");
      setValue("images", product.images || []);
      console.log("Fetched product data:", product.images);
    } catch (exception) {
      console.error("Error fetching product:", exception);
      toast.error("Error fetching product...");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchBrands();
    getProduct();
  }, [productId]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setValue("images", fileArray);


      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreview(previewUrls);
    }
  };

  const submitEvent = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("summary", data.summary);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("discount", data.discount.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("status", data.status);
      formData.append("categoryId", data.categoryId);
      formData.append("brandId", data.brandId);
      formData.append("slug", data.slug);

      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((file: File) => {
          formData.append("images", file);
        });
      }


      await axiosInstance.put(`${baseURLl}/product/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully");
      navigate("/admin/product");
    } catch (exception: any) {
      console.error("Error updating product:", exception.response?.data || exception.message);
      toast.error(exception.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <>
      <HeaderComponent />

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6">Edit Product</h1>

          <div className="rounded-lg border border-gray-200 mt-5 p-6 bg-white shadow-md">
            <form onSubmit={handleSubmit(submitEvent)}>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Title<span className="text-red-500">*</span>
                </label>
                <TextInputField
                  control={control}
                  name="title"
                  errMsg={errors.title?.message || ""}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Summary<span className="text-red-500">*</span>
                </label>
                <TextInputField
                  control={control}
                  name="summary"
                  errMsg={errors.summary?.message || ""}
                  required
                />
              </div>


              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <TextInputField
                  control={control}
                  name="description"
                  errMsg={errors.description?.message || ""} required={false} />
              </div>


              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Price<span className="text-red-500">*</span>
                </label>
                <TextInputField
                  control={control}
                  name="price"
                  type="number"
                  errMsg={errors.price?.message || ""}
                  required
                />
              </div>


              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Discount
                </label>
                <TextInputField
                  control={control}
                  name="discount"
                  type="number"
                  errMsg={errors.discount?.message || ""} required={false} />
              </div>


              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Category<span className="text-red-500">*</span>
                </label>
                <SelectOptionComponent
                  options={categories.map((c) => ({
                    label: c.title || c._id,
                    value: c._id,
                  }))}
                  control={control}
                  name="categoryId"
                  errMsg={errors.categoryId?.message || ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Brand<span className="text-red-500">*</span>
                </label>
                <SelectOptionComponent
                  options={brands.map((b) => ({
                    label: b.title || b._id,
                    value: b._id,
                  }))}
                  control={control}
                  name="brandId"
                  errMsg={errors.brandId?.message || ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Upload Images</label>


                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />

                {imagePreview.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {imagePreview.map((imgUrl, index) => (
                      <div key={index} className="relative">
                        <img
                          src={imgUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg border"
                          onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-1"
                          onClick={() => {
                            const newPreview = [...imagePreview];
                            newPreview.splice(index, 1);
                            setImagePreview(newPreview);


                            const currentImages = Array.isArray(control._formValues.images) ? [...control._formValues.images] : [];
                            currentImages.splice(index, 1);
                            setValue("images", currentImages);
                          }}
                        >X</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>




              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterComponent />
    </>
  );
};

export default AdminProductEdit;




// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "axios";
// import { TextInputField, SelectOptionComponent } from "../../components/common/form";
// import { FooterComponent, HeaderComponent, LoadingComponent } from "../../components/common";
// const baseURL = import.meta.env.VITE_API_BASE_URL;
// const AdminProductEdit = () => {
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [brands, setBrands] = useState<any[]>([]);
//   const [detail, setDetail] = useState<any>({});
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   console.log("Product ID from params:", productId);
//   const updateSchema = Yup.object({
//     title: Yup.string().min(3).required("Title is required"),
//     summary: Yup.string().required("Summary is required"),
//     description: Yup.string().nullable(),
//     price: Yup.number().min(100).required("Price is required"),
//     discount: Yup.number().min(0).max(90).default(0),
//     isFeatured: Yup.boolean().default(false),
//     status: Yup.string().oneOf(["active", "inactive"]).default("inactive"),
//     categoryId: Yup.string().required("Category is required"),
//     brandId: Yup.string().required("Brand is required"),
//     slug: Yup.string().required("Slug is required"),
//     images: Yup.array()
//       .of(Yup.mixed().test("fileType", "Must be a file", value => value instanceof File))
//       .nullable(),

//   });

//   const { control, handleSubmit, setValue, register, formState: { errors } } = useForm({
//     resolver: yupResolver(updateSchema),
//   });


//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get(`${baseURL}/category`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       setCategories(response.data.data.result);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Error fetching categories...");
//     }
//   };


//   const fetchBrands = async () => {
//     try {
//       const response = await axiosInstance.get(`${baseURL}/brand`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       setBrands(response.data.data.result);
//     } catch (error) {
//       console.error("Error fetching brands:", error);
//       toast.error("Error fetching brands...");
//     }
//   };
//   const getProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(`${baseURL}/product/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       const product = response.data.data.result;

//       console.log("Fetched product data:", product);
//       if (!product) {
//         throw new Error("Product data is missing or not returned properly");
//       }


//       setValue("title", product.title || "");
//       setValue("summary", product.summary || "");
//       setValue("description", product.description || "");
//       setValue("price", product.price || 0);
//       setValue("discount", product.discount || 0);
//       setValue("isFeatured", product.isFeatured || false);
//       setValue("status", product.status || "inactive");
//       setValue("categoryId", Array.isArray(product.categoryId) ? product.categoryId[0] : product.categoryId || "");
//       setValue("brandId", product.brandId || "");
//       setValue("slug", product.slug || "");
//       setValue("images", product.images || []);
//       setDetail(product);

//     } catch (exception) {
//       console.error("Error fetching product:", exception);
//       toast.error("Error fetching product...");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBrands();
//     getProduct();
//   }, [productId]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       setValue("images", fileArray);
//     }
//   };

//   const submitEvent = async (data: any) => {
//     console.log("Form data to submit:", data);
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("summary", data.summary);
//       formData.append("description", data.description || "");
//       formData.append("price", data.price.toString());
//       formData.append("discount", data.discount.toString());
//       formData.append("isFeatured", data.isFeatured.toString());
//       formData.append("status", data.status);
//       formData.append("categoryId", data.categoryId);
//       formData.append("brandId", data.brandId);
//       formData.append("slug", data.slug);

//       if (data.images && Array.isArray(data.images)) {
//         data.images.forEach((file: File) => {
//           formData.append("images", file);
//         });
//       }
//       console.log("Submitting form data:", formData);

//       await axiosInstance.put(`${baseURL}/product/${productId}`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           "Content-Type": "multipart/form-data",
//         }

//       });
//       toast.success("Product updated successfully");
//       navigate("/admin/product");

//     } catch (exception: any) {
//       console.error("Error updating product:", exception.response?.data || exception.message);
//       toast.error(exception.response?.data?.message || "Error updating product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingComponent />;

//   return (
//     <>
//       <HeaderComponent />

//       <section>
//         <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
//           <h1 className="text-6xl font-bold">Edit Product</h1>
//           <div className="rounded-lg border border-gray-200 mt-5">
//             <div className="overflow-x-auto rounded-t-lg">
//               <form
//                 onSubmit={handleSubmit(
//                   (data) => {
//                     console.log("✅ SubmitEvent triggered with data:", data);
//                     submitEvent(data);
//                   },
//                   (errors) => {
//                     console.error("❌ Validation errors:", errors);
//                   }
//                 )}
//               >

//                 <div className="col-span-6">
//                   <label htmlFor="title" className="block text-xl font-medium text-gray-700">
//                     Title<span className="text-red">*</span>
//                   </label>
//                   <TextInputField
//                     control={control}
//                     name="title"
//                     errMsg={errors.title?.message || ""}
//                     required={true}
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="summary" className="block text-xl font-medium text-gray-700">
//                     Summary<span className="text-red">*</span>
//                   </label>
//                   <TextInputField
//                     control={control}
//                     name="summary"
//                     errMsg={errors.summary?.message || ""}
//                     required={true}
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="description" className="block text-xl font-medium text-gray-700">
//                     Description
//                   </label>
//                   <TextInputField
//                     control={control}
//                     name="description"
//                     errMsg={errors.description?.message || ""}
//                     required={false}
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="price" className="block text-xl font-medium text-gray-700">
//                     Price<span className="text-red">*</span>
//                   </label>
//                   <TextInputField
//                     control={control}
//                     name="price"
//                     type="number"
//                     errMsg={errors.price?.message || ""}
//                     required={true}
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="discount" className="block text-xl font-medium text-gray-700">
//                     Discount
//                   </label>
//                   <TextInputField
//                     control={control}
//                     name="discount"
//                     type="number"
//                     errMsg={errors.discount?.message || ""}
//                     required={false}
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="categoryId" className="block text-xl font-medium text-gray-700">
//                     Category<span className="text-red">*</span>
//                   </label>
//                   <SelectOptionComponent
//                     options={categories.map(category => ({ label: category._id, value: category._id }))}
//                     control={control}
//                     name="categoryId"
//                     errMsg={errors.categoryId?.message || ""}

//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="brandId" className="block text-xl font-medium text-gray-700">
//                     Brand<span className="text-red">*</span>
//                   </label>
//                   <SelectOptionComponent
//                     options={brands.map(brand => ({ label: brand._id, value: brand._id }))}
//                     control={control}
//                     name="brandId"
//                     errMsg={errors.brandId?.message || ""}

//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="status" className="block text-xl font-medium text-gray-700">
//                     Status
//                   </label>
//                   <select
//                     {...register("status")}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>

//                 <div className="col-span-6">
//                   <label htmlFor="images" className="block text-xl font-medium text-gray-700">
//                     Upload Images
//                   </label>
//                   <input
//                     type="file"
//                     multiple
//                     onChange={handleFileChange}
//                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                   />
//                 </div>

//                 <div className="col-span-6">
//                   <button
//                     type="submit"
//                     className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     Update Product
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       <FooterComponent />
//     </>
//   );
// };

// export default AdminProductEdit;


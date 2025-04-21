import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInputField, SelectOptionComponent, CheckboxField } from "../../components/common/form";
import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "../../components/common";
// import React from "react";

const AdminBrandCreate = () => {
  const [loading, setLoading] = useState(false);

  const createSchema = Yup.object().shape({
    title: Yup.string().min(3).required(),
    status: Yup.string().required().oneOf(['active', 'inactive']),
    image: Yup.mixed().required("Image is required"), // Adding validation message
    homeSection: Yup.boolean().default(false),
  });

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(createSchema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      console.log('Access Token:', accessToken); 
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('status', data.status);
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]); 
      } else {
        throw new Error('Image is required');
      }
      formData.append('homeSection', data.homeSection ? 'true' : 'false');

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data"
      };

      console.log('Headers:', headers); 
      console.log('FormData:', formData); 

      const response = await axiosInstance.post('/brand', formData, { headers });

      toast.success("Brand created successfully");
      navigate("/admin/brand");
    } catch (error: any) {
      console.error("Error creating brand:", error);
      toast.error(error.message || "Failed to create brand");
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
          <h1 className="text-6xl font-bold">Create Brand</h1>
          <div></div>
        </div>
        <div className="rounded-lg border border-gray-200 mt-5">
          <div className="overflow-x-auto rounded-t-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    onChange={(e: any) => setValue('image', e.target.files)}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <CheckboxField
                    control={control}
                    name="homeSection"
                    label="Home Section"
                    checked={false}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-blue-500 hover:bg-blue-700 px-3 py-2.5 text-xl font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Brand"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default AdminBrandCreate;

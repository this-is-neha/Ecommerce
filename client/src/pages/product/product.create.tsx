

import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

const ProductCreate = () => {
  const navigate = useNavigate();

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [brands, setBrands] = useState<any[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [product, setProduct] = useState({
    title: "",
    summary: "",
    description: "",
    price: 0,
    discount: 0,
    isFeatured: false,
    status: "inactive",
    images: "",
    categoryId: "",
    brandId: "",
    slug: "",
  });

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axiosInstance.get("/category", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setCategories(response.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories...");
    } finally {
      setLoadingCategories(false);
    }
  };
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const response = await axiosInstance.get("/brand", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),// where token is retrieved using localStorage.getItem("token")

        },
      });
      setBrands(response.result);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Error fetching brands...");
    } finally {
      setLoadingBrands(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      slug: name === "title" ? generateSlug(value) : prev.slug,
    }));
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setUploadedImages(imageUrls); // Store URLs for preview
      setImageFiles(fileArray); // Store file objects for upload
    }
  };

  const checkSlugExists = async (slug: string) => {
    try {
      const response = await axiosInstance.get(`/product/check-slug?slug=${slug}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      return response.data?.exists !== undefined ? response.data.exists : false;
    } catch (error) {
      console.error("Error checking slug:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slugExists = await checkSlugExists(product.slug);
    if (slugExists) {
      toast.error("Slug must be unique. Please choose another.");
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("summary", product.summary);
    formData.append("description", product.description || "");
    formData.append("price", product.price.toString());
    formData.append("discount", product.discount.toString());
    formData.append("isFeatured", product.isFeatured.toString());
    formData.append("status", product.status);
    formData.append("categoryId", product.categoryId);
    formData.append("brandId", product.brandId);
    formData.append("slug", product.slug);

    // Append image files
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axiosInstance.post("/product", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully!");
      navigate("/admin/product");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product...");
    }
  };


  return (
<>
<HeaderComponent/>
<div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-lg font-medium mb-2">Summary:</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={product.summary}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium mb-2">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="100"
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="discount" className="block text-lg font-medium mb-2">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            min="0"
            max="90"
            defaultValue={0}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <div>
            <label htmlFor="category-select" className="block text-lg font-medium mb-2">Select Category:</label>
            <select
              id="category-select"
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category._id}
                </option>
              ))}
            </select>
          </div>
        )}

        {loadingBrands ? (
          <p>Loading brands...</p>
        ) : (
          <div>
            <label htmlFor="brand-select" className="block text-lg font-medium mb-2">Select Brand:</label>
            <select
              id="brand-select"
              name="brandId"
              value={product.brandId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand._id}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="isFeatured" className="flex items-center mb-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
              className="mr-2"
            />
            Is Featured
          </label>
        </div>

        <div>
          <label htmlFor="status" className="block text-lg font-medium mb-2">Status:</label>
          <select
            id="status"
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label htmlFor="images" className="block text-lg font-medium mb-2">Upload Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>


        <div className="grid grid-cols-3 gap-4 mt-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image || 'placeholder-image-url'}
                alt="Product Thumbnail"
                onError={(e) => (e.currentTarget.src = 'placeholder-image-url')}
                className="product-thumbnail"
              />
            </div>
          ))}
        </div>

        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative">
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <img src={selectedImage} alt="Selected" className="max-w-full max-h-screen object-cover" />
            </div>
          </div>
        )}



        <button type="submit" className="mt-4 bg-blue-500 text-white p-3 rounded-md">
          Create Product
        </button>
      </form>
    </div>
<FooterComponent/>
</>
  
  );
};

export default ProductCreate;





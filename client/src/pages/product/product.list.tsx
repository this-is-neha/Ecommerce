import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import PaginationComponent from "../../components/common/table/pagination.component";
import TableActionButton from "../../components/common/table/action-button.component";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

export const PER_PAGE_LIMIT = 17;

const AdminProductList = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [isCategoryFetched, setIsCategoryFetched] = useState(false);
  const [isBrandFetched, setIsBrandFetched] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const getProductList = async ({ page = 1, limit = PER_PAGE_LIMIT, categoryId, brandId }: any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/product", {
        params: { page, limit, categoryId, brandId },
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });

      const totalPages = Math.ceil(response.meta.total / response.meta.limit);
      setPagination({ totalPages, currentPage: response.meta.page });
      setProducts(response.result);
    } catch (exception) {
      console.error("Error fetching products:", exception);
      toast.error("Error fetching products...");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (isCategoryFetched) return;
    try {
      const response = await axiosInstance.get("/category", {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });
      setCategories(response.result);
      setIsCategoryFetched(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories...");
    }
  };

  const fetchBrands = async () => {
    if (isBrandFetched) return;
    try {
      const response = await axiosInstance.get("/brand", {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });
      setBrands(response.result);
      setIsBrandFetched(true);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Error fetching brands...");
    }
  };

  useEffect(() => {
    getProductList({ page: 1, limit: PER_PAGE_LIMIT });
  }, []);

  const openImageModal = (image: string) => {
    console.log("Opening image modal with:", image);
    setSelectedImage(image);
    setModalOpen(true);
  };
  

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/product/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });
      toast.success("Product deleted successfully");
      getProductList({ page: pagination.currentPage, limit: PER_PAGE_LIMIT });
    } catch (exception) {
      toast.error("Product cannot be deleted at this moment");
      console.error(exception);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByCategory = (categoryId: string) => {
    navigate(`/category/${categoryId}`); 
    setPagination({ totalPages: 0, currentPage: 1 }); 
    getProductList({ page: 1, limit: PER_PAGE_LIMIT, categoryId }); 
  };

  const handleFilterByBrand = (brandId: string) => {
    navigate(`/brand/${brandId}`);
    setPagination({ totalPages: 0, currentPage: 1 });
    getProductList({ page: 1, limit: PER_PAGE_LIMIT, brandId }); 
  };

  const handleCreateProduct = () => {
    navigate("create");
  };

  return (
 <>
 <HeaderComponent/>
 <section>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-6xl font-bold">Product List</h1>
          <button onClick={handleCreateProduct} className="bg-green-600 text-white px-4 py-2 rounded">
            Create Product
          </button>
        </div>

        <div className="grid grid-cols-3 gap-16 lg:gap-18">
          <div className="flex flex-col">
            <button onClick={fetchCategories} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">
              Filter by Category
            </button>
            <div className="bg-white border border-gray-200 rounded p-4">
              {categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => handleFilterByCategory(category._id)}
                  className="bg-gray-200 mb-2 px-4 py-2 rounded"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <button onClick={fetchBrands} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">
              Filter by Brand
            </button>
            <div className="bg-white border border-gray-200 rounded p-4">
              {brands.map(brand => (
                <button
                  key={brand._id}
                  onClick={() => handleFilterByBrand(brand._id)}
                  className="bg-gray-200 mb-2 px-4 py-2 rounded"
                >
                  {brand.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 mt-5">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-black">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Title</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Price</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Discount</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Status</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Category</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Brand</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Images</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
                </tr>
              </thead>

            
              <tbody className="divide-y divide-gray-200">
  {loading ? (
    <tr>
      <td colSpan={8}>
        <div className="flex justify-center py-4">
          <span>Loading...</span>
        </div>
      </td>
    </tr>
  ) : products.length > 0 ? (
    products.map((product) => (
      <tr className="odd:bg-gray-50 cursor-pointer" key={product._id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {product.title}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          ${product.price}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {product.discount}%
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {product.status}
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <button onClick={() => handleFilterByCategory(product.categoryId)} className="text-blue-500 hover:underline">
            {product.categoryId || "No category"}
          </button>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <button onClick={() => handleFilterByBrand(product.brandId)} className="text-blue-500 hover:underline">
            {product.brandId || "No brand"}
          </button>
        </td>

        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
  {product.images && product.images.length > 0 ? (
    <>
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-12 w-12 object-cover"
        onClick={() => openImageModal(product.images[0])}
      />
      {console.log("Image URL:", product.images[0])} 
    </>
  ) : (
    "No Image"
  )}
</td>
   <td className="whitespace-nowrap px-4 py-2">
          <TableActionButton
            editUrl={`/admin/product/${product._id}`}
            rowId={product._id as string}
            deleteAction={deleteProduct}
          />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={8}>
        <div className="flex justify-center py-4">
          <span>No products found</span>
        </div>
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
          <PaginationComponent
            totalPages={pagination.totalPages}
            currentPage={pagination.currentPage}
            onPageChange={(page) => getProductList({ page })}
          />
        </div>
      </div>
    </section>
 <FooterComponent/>
 </>
  );
};

export default AdminProductList;



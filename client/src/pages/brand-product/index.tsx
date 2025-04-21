import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import PaginationComponent from "../../components/common/table/pagination.component";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { FooterComponent, HeaderComponent } from "../../components/common";
export const PER_PAGE_LIMIT = 22;
 const baseURL='http://127.0.0.1:5500/server/public/uploads/product/';
const BrandProductList = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
  const [sortOption, setSortOption] = useState("default"); 
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null); 
const baseURL = 'http://127.0.0.1:5500/public/uploads/product/';
  const getProductList = async ({ page = 1, limit = PER_PAGE_LIMIT, brandId, sort = sortOption }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/product", {
        params: { page, limit, brandId, sort },
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });

      const totalPages = Math.ceil(response?.meta?.total / response?.meta?.limit || 1);
      setPagination({ totalPages, currentPage: response?.meta?.page || 1 });
      setProducts(response?.result || []);
    } catch (exception) {
      console.error("Error fetching products:", exception);
      toast.error("Error fetching products...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      getProductList({ page: 1, limit: PER_PAGE_LIMIT, brandId, sort: sortOption });
    }
  }, [brandId, sortOption]);

  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken") || null;
      const response = await axiosInstance.get('/auth/me', {
        headers: {
          "Authorization": `Bearer ${token}`, // Ensure space after Bearer
        },
      });
      const user = response.result; // Assuming the response structure has a result object
      console.log("User Name by :", user.name); // Log the user's name
      setLoggedInUser(user.name);
      setLoggedInUserId(user._id) // Store user details in state
    } catch (exception) {
      console.error('Error fetching User Details:', exception);
    }
  };

  useEffect(() => {
    if (brandId) {
      getProductList({ page: 1, limit: PER_PAGE_LIMIT, brandId, sort: sortOption });
    }
    getLoggedInUser(); // Fetch the logged-in user details when component mounts
  }, [brandId, sortOption]);

  const handleAddToCart = async (product: any) => {
    try {
      console.log('Product ID:', product._id);
      console.log('User ID:', loggedInUserId);
      const token = localStorage.getItem("accessToken") || null; // Get the token from local storage
  
      const response = await axiosInstance.post(`/addToCart/add/${loggedInUserId}`, {
        productId: product._id, // Send the product ID in the request body
      }, {
        headers: {
          "Authorization": `Bearer ${token}`, // Ensure space after Bearer
        },
      });
  
      console.log('Response:', response); // Log the response
      navigate(`/${loggedInUserId}/cart`);
     
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart.');
    }
  };
  
  

  const handleOrder = (product: { _id: any; title: any; }) => {
    const productId = product._id;
    const productName = product.title;
    navigate(`/${productName}/${productId}/order`);
  };

  return (
 <>
 <HeaderComponent/>
 <section>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl font-bold">Products in Brand</h1>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mt-4 border rounded-md"
        >
          <option value="default">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
        <div className="mt-4">
          {loggedInUser ? (
            <p>Welcome, {loggedInUser}</p> // Correctly display logged-in user's name
          ) : (
            <p>Welcome, Guest!</p>
          )}
        </div>

       
           <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-4">
              <span>Loading...</span>
            </div>
          ) : products.length > 0 ? (
            products.map((product) => {
              const imageUrl = product.images && product.images.length > 0
                ? `${baseURL}${encodeURIComponent(product.images[0])}`
                : '';
              return (
                <div className="bg-white rounded-lg shadow-md p-4" key={product._id}>
                  <h2 className="font-semibold text-lg">{product.title}</h2>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-md mt-2"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'path/to/placeholder/image.jpg'; // Update this path
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-md mt-2">
                      No images
                    </div>
                  )}
                  <div className="mt-2">
                    <p className="text-gray-700">Price: ${product.price}</p>
                    <p className="text-gray-700">Discount: {product.discount ? `${product.discount}%` : 'No discount'}</p>
                    <p className="text-gray-600 mt-1">{product.description || 'No description available'}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Add to Cart
                    </button>
                    <button
                     onClick={() => handleOrder(product)} 
                    className="bg-blue-500 text-white py-2 px-4 rounded">
                      Order Product
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-4">
              <span>No products found in this category.</span>
            </div>
          )}
        </div>
        <PaginationComponent pagination={pagination} getProductList={getProductList} />
      </div>
    </section>
 <FooterComponent/></>
  );
};

export default BrandProductList;



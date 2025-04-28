import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios.config';
import PaginationComponent from '../../components/common/table/pagination.component';
import { useCart } from '../../context/cart.context';
import { PER_PAGE_LIMIT } from '../brand-product';
import { FooterComponent, HeaderComponent } from '../../components/common';
const baseURLl = import.meta.env.VITE_API_BASE_URL;
const CategoryProductList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
  const [sortOption, setSortOption] = useState('default');
  const { addToCart } = useCart();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // Initialize state for logged-in user
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null); 
  const baseURL = `${baseURLl}/server/public/uploads/product/`;


  //   try {
  //     setLoading(true);
  //     console.log('Fetching products with sort option:', sort);
  //     const response = await axiosInstance.get(`${baseURLl}/product`, {
  //       params: { page, limit, categoryId, sort },
  //       headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
  //     });

  //     const totalPages = Math.ceil(response?.meta?.total / response?.meta?.limit || 1);
  //     setPagination({ totalPages, currentPage: response?.meta?.page || 1 });
  //     setProducts(response?.result || []);
  //   } catch (exception) {
  //     console.error('Error fetching products:', exception);
  //     toast.error('Error fetching products...');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getProductList = async ({ page = 1, limit = PER_PAGE_LIMIT, categoryId, sort = sortOption }: { page?: number; limit?: number; categoryId: string; sort?: string }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${baseURLl}/product`, {
        params: { page, limit, categoryId, sort },
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      });
  
      console.log('Full product response:', response);  // response is actual data object here
  
      if (!response) throw new Error("No data in response");
      if (!response.meta) throw new Error("No meta in response");
      if (!response.result) throw new Error("No result in response");
  
      const totalPages = Math.ceil((response.meta.total || 0) / (response.meta.limit || 1));
      setPagination({ totalPages, currentPage: response.meta.page || 1 });
      setProducts(response.result || []);
    } catch (exception) {
      console.error('Error fetching products:', exception);
      toast.error('Error fetching products...');
    } finally {
      setLoading(false);
    }
  };
  
  
  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken") || null;
      const response = await axiosInstance.get(`${baseURLl}/auth/me`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
  
      console.log('Full user response:', response);
  
      if (!response) throw new Error("No data in user response");
      if (!response.data.result) throw new Error("No result in user response");
  
      const user = response.data.result;
      setLoggedInUser(user.name);
      setLoggedInUserId(user._id);
    } catch (exception) {
      console.error('Error fetching User Details:', exception);
    }
  };
  
  
  
  
  // const getLoggedInUser = async () => {
  //   try {
  //     const token = localStorage.getItem("accessToken") || null;
  //     const response = await axiosInstance.get(`${baseURLl}/auth/me`, {
  //       headers: {
  //         "Authorization": `Bearer ${token}`, // Ensure space after Bearer
  //       },
  //     });
  //     const user = response.result; 
  //     console.log("User Name by :", user.name); 
  //     setLoggedInUser(user.name);
  //     setLoggedInUserId(user._id) // Store user details in state
  //   } catch (exception) {
  //     console.error('Error fetching User Details:', exception);
  //   }
  // };

  

  useEffect(() => {
    if (categoryId) {
      getProductList({ page: 1, limit: PER_PAGE_LIMIT, categoryId, sort: sortOption });
    }
    getLoggedInUser(); // Fetch the logged-in user details when component mounts
  }, [categoryId, sortOption]);

 

  const handleAddToCart = async (product: any) => {
    try {
      console.log('Product ID:', product._id);
      console.log('User ID:', loggedInUserId);
      const token = localStorage.getItem("accessToken") || null; // Get the token from local storage
  
      const response = await axiosInstance.post(`${baseURLl}/addToCart/add/${loggedInUserId}`, {
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
        <h1 className="text-6xl font-bold">Products in Category</h1>

        {/* Display logged-in user's name or ID */}
        <div className="mt-4">
          {loggedInUser ? (
            <p>Welcome, {loggedInUser}</p> // Correctly display logged-in user's name
          ) : (
            <p>Welcome, Guest!</p>
          )}
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mt-4 border rounded-md"
        >
          <option value="default">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>

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
                      className="w-FULL h-58 object-cover rounded-md mt-2"
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
                    <p className="text-gray-600 mt-1">{product.summary || 'No description available'}</p>
                    {/* <p className="text-gray-600 mt-1">{product.description || 'No description available'}</p> */}
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
        <PaginationComponent pagination={pagination} fetchCall={getProductList} />
      </div>
    </section>
<FooterComponent/></>
  );
};

export default CategoryProductList;

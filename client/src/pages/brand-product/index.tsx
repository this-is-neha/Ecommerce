

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import PaginationComponent from "../../components/common/table/pagination.component";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

export const PER_PAGE_LIMIT = 22;
const baseURLl = import.meta.env.VITE_API_BASE_URL;
const baseURL = `${baseURLl}/public/uploads/product/`;

interface GetProductListParams {
  page?: number;
  limit?: number;
  brandId?: string;
  sort?: string;
}

const BrandProductList = () => {
  const params = useParams<{ brandId: string }>();
  const brandId = params.brandId;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
  const [sortOption, setSortOption] = useState("default");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  const getProductList = async ({
    page = 1,
    limit = PER_PAGE_LIMIT,
    brandId,
    sort = sortOption,
  }: GetProductListParams) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${baseURLl}/product`, {
        params: { page, limit, brandId, sort },
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });

      console.log("API response:", response);

      // response is the data directly here
      const { meta = {}, result = [] } = response || {};

      const totalPages = Math.ceil((meta.total || 0) / (meta.limit || 1));
      setPagination({ totalPages, currentPage: meta.page || 1 });
      setProducts(result);
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
      const response = await axiosInstance.get(`${baseURLl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.result; // same adjustment if response shape is similar
      console.log("User Name by :", user.name);
      setLoggedInUser(user.name);
      setLoggedInUserId(user._id);
    } catch (exception) {
      console.error("Error fetching User Details:", exception);
    }
  };

  useEffect(() => {
    if (brandId) {
      getProductList({ page: 1, limit: PER_PAGE_LIMIT, brandId, sort: sortOption });
    }
    getLoggedInUser();
  }, [brandId, sortOption]);

  // Dummy handlers (replace or implement as needed)
  const handleAddToCart = (product: any) => {
    toast.success(`Added ${product.title} to cart!`);
    navigate(`/${loggedInUserId}/cart`);
  };

  const handleOrder = (product: any) => {
    navigate(`/order/${product._id}`);
  };

  return (
    <>
      <HeaderComponent />
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
              <p>Welcome, {loggedInUser}</p>
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
                const imageUrl =
                  product.images && product.images.length > 0
                    ? `${baseURL}${encodeURIComponent(product.images[0])}`
                    : "";
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
                          e.currentTarget.src = "path/to/placeholder/image.jpg"; // Update this path
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-md mt-2">
                        No images
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="text-gray-700">Price: ${product.price}</p>
                      <p className="text-gray-700">
                        Discount: {product.discount ? `${product.discount}%` : "No discount"}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {product.description || "No description available"}
                      </p>
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
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
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
      <FooterComponent />
    </>
  );
};

export default BrandProductList;




// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "../../config/axios.config";
// import PaginationComponent from "../../components/common/table/pagination.component";
// import React from "react";
// import { useNavigate } from 'react-router-dom';
// import { FooterComponent, HeaderComponent } from "../../components/common";
// export const PER_PAGE_LIMIT = 22;
// const baseURLl = import.meta.env.VITE_API_BASE_URL;
//  const baseURL=`${baseURLl}/server/public/uploads/product/`;
// const BrandProductList = () => {
//   const { brandId } = useParams<{ brandId: string }>();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState<any[]>([]);
//   const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
//   const [sortOption, setSortOption] = useState("default"); 
//   const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
//   const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null); 
// const baseURL = `${baseURLl}/public/uploads/product/`;
//   const getProductList = async ({ page = 1, limit = PER_PAGE_LIMIT, brandId, sort = sortOption }) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(`${baseURLl}/product`, {
//         params: { page, limit, brandId, sort },
//         headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
//       });

//       const totalPages = Math.ceil(response?.meta?.total / response?.meta?.limit || 1);
//       setPagination({ totalPages, currentPage: response?.meta?.page || 1 });
//       setProducts(response?.result || []);
//     } catch (exception) {
//       console.error("Error fetching products:", exception);
//       toast.error("Error fetching products...");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (brandId) {
//       getProductList({ page: 1, limit: PER_PAGE_LIMIT, brandId, sort: sortOption });
//     }
//   }, [brandId, sortOption]);

//   const getLoggedInUser = async () => {
//     try {
//       const token = localStorage.getItem("accessToken") || null;
//       const response = await axiosInstance.get(`${baseURLl}/auth/me`, {
//         headers: {
//           "Authorization": `Bearer ${token}`, // Ensure space after Bearer
//         },
//       });
//       const user = response.result; // Assuming the response structure has a result object
//       console.log("User Name by :", user.name); // Log the user's name
//       setLoggedInUser(user.name);
//       setLoggedInUserId(user._id) // Store user details in state
//     } catch (exception) {
//       console.error('Error fetching User Details:', exception);
//     }
//   };

//   useEffect(() => {
//     if (brandId) {
//       getProductList({ page: 1, limit: PER_PAGE_LIMIT, brandId, sort: sortOption });
//     }
//     getLoggedInUser(); // Fetch the logged-in user details when component mounts
//   }, [brandId, sortOption]);

//   const handleAddToCart = async (product: any) => {
//     try {
//       console.log('Product ID:', product._id);
//       console.log('User ID:', loggedInUserId);
//       const token = localStorage.getItem("accessToken") || null; 
  
//       const response = await axiosInstance.post(`${baseURLl}/addToCart/add/${loggedInUserId}`, {
//         productId: product._id, 
//       }, {
//         headers: {
//           "Authorization": `Bearer ${token}`, // Ensure space after Bearer
//         },
//       });
  
//       console.log('Response:', response); // Log the response
//       navigate(`/${loggedInUserId}/cart`);
     
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       toast.error('Failed to add product to cart.');
//     }
//   };
  
  

//   const handleOrder = (product: { _id: any; title: any; }) => {
//     const productId = product._id;
//     const productName = product.title;
//     navigate(`/${productName}/${productId}/order`);
//   };

//   return (
//  <>
//  <HeaderComponent/>
//  <section>
//       <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
//         <h1 className="text-6xl font-bold">Products in Brand</h1>

//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="mt-4 border rounded-md"
//         >
//           <option value="default">Sort by</option>
//           <option value="priceAsc">Price: Low to High</option>
//           <option value="priceDesc">Price: High to Low</option>
//         </select>
//         <div className="mt-4">
//           {loggedInUser ? (
//             <p>Welcome, {loggedInUser}</p> // Correctly display logged-in user's name
//           ) : (
//             <p>Welcome, Guest!</p>
//           )}
//         </div>

       
//            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {loading ? (
//             <div className="col-span-full text-center py-4">
//               <span>Loading...</span>
//             </div>
//           ) : products.length > 0 ? (
//             products.map((product) => {
//               const imageUrl = product.images && product.images.length > 0
//                 ? `${baseURL}${encodeURIComponent(product.images[0])}`
//                 : '';
//               return (
//                 <div className="bg-white rounded-lg shadow-md p-4" key={product._id}>
//                   <h2 className="font-semibold text-lg">{product.title}</h2>
//                   {imageUrl ? (
//                     <img
//                       src={imageUrl}
//                       alt={product.title}
//                       className="w-full h-48 object-cover rounded-md mt-2"
//                       onError={(e) => {
//                         e.currentTarget.onerror = null;
//                         e.currentTarget.src = 'path/to/placeholder/image.jpg'; // Update this path
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-md mt-2">
//                       No images
//                     </div>
//                   )}
//                   <div className="mt-2">
//                     <p className="text-gray-700">Price: ${product.price}</p>
//                     <p className="text-gray-700">Discount: {product.discount ? `${product.discount}%` : 'No discount'}</p>
//                     <p className="text-gray-600 mt-1">{product.description || 'No description available'}</p>
//                   </div>
//                   <div className="mt-4 flex space-x-2">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="bg-green-500 text-white py-2 px-4 rounded"
//                     >
//                       Add to Cart
//                     </button>
//                     <button
//                      onClick={() => handleOrder(product)} 
//                     className="bg-blue-500 text-white py-2 px-4 rounded">
//                       Order Product
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-span-full text-center py-4">
//               <span>No products found in this category.</span>
//             </div>
//           )}
//         </div>
//         <PaginationComponent pagination={pagination} getProductList={getProductList} />
//       </div>
//     </section>
//  <FooterComponent/></>
//   );
// };

// export default BrandProductList;

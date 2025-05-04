import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "axios";
import PaginationComponent from "../../components/common/table/pagination.component";
import { FooterComponent, HeaderComponent } from "../../components/common";

export const PER_PAGE_LIMIT = 22;
const baseURLl = import.meta.env.VITE_API_BASE_URL;
const baseURL = `${baseURLl}/assets/uploads/product/`;

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
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
      });
      console.log("API response:", response);  
      console.log("API response data:", response.data.data.result); 
      if (response.data.data && Array.isArray(response.data.data.result)) {
        const { meta = {}, result = [] } = response.data.data;
        const totalPages = Math.ceil((meta.total || 0) / (meta.limit || 1));
        setPagination({ totalPages, currentPage: meta.page || 1 });
        setProducts(result);
      } else {
        console.error('Invalid response structure:', response.data.data);
        toast.error("Failed to fetch products");
      }
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
  
      console.log("User Details Responsessss:", response);
  console.log("User name ", response.data.data.result.name); // Log the user name
      if (response.data?.data.result) {
        const user = response.data.data.result; 
        console.log("User Name by:", user.name);
        setLoggedInUser(user.name);
        setLoggedInUserId(user._id);
      } else {
        console.error("No user data found in response:", response);
        setLoggedInUser(null);
        setLoggedInUserId(null);
      }
    } catch (exception) {
      console.error("Error fetching User Details:", exception);
      setLoggedInUser(null);
      setLoggedInUserId(null);
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
          <PaginationComponent pagination={pagination} fetchCall={getProductList} />
        </div>
      </section>
      <FooterComponent />
    </>
  );
};

export default BrandProductList;




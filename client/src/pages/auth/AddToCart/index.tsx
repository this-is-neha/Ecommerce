import React, { useEffect, useState } from 'react';
import { useCart } from '../../../context/cart.context';
import { toast } from 'react-toastify';
import axiosInstance from '../../../config/axios.config'; // Adjust the import as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FooterComponent, HeaderComponent } from '../../../components/common';

const CartPage = () => {
  const { cartItems, removeFromCart, setCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // State to hold the user ID
  const [productResponses, setProductResponses] = useState<any[]>([]); // State to store product details responses

  const baseURL = 'http://127.0.0.1:5500/public/uploads/product/';
  const navigate = useNavigate(); // Initialize useNavigate

  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken") || null;
      const response = await axiosInstance.get('/auth/me', {
        headers: {
          "Authorization": `Bearer ${token}`, // Ensure space after Bearer
        },
      });
      const user = response.result; // Assuming the response structure has a result object
      setUserId(user._id); // Store user ID in state
    } catch (exception) {
      console.error('Error fetching User Details:', exception);
    }
  };

  useEffect(() => {
    getLoggedInUser(); // Fetch the logged-in user details when component mounts
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return; // Return if userId is not set

      try {
        const token = localStorage.getItem("accessToken") || null;

        const response = await axiosInstance.get(`addToCart/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        const cartItems = response.products; 
  
        const updatedCartItems = await Promise.all(
          cartItems.map(async (item: any) => {
            const productResponse = await axiosInstance.get(`/product/${item.productId}`, {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            });  
            setProductResponses(prevResponses => [...prevResponses, productResponse]);

            return {
              ...item,
              ...productResponse.data, 
            };
          })
        );
      
        setCartItems(updatedCartItems); 
      } catch (error) {
        console.error('Error fetching cart items:', error);
      
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartItems();
  }, [userId, setCartItems]);

  const handleRemoveProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem("accessToken") || null;
      await axiosInstance.delete(`/addToCart/remove/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId }, 
      });
      toast.success('Product removed from cart!');

      
      setCartItems(cartItems.filter(item => item.productId !== productId));
      setProductResponses(productResponses.filter(response => response.result._id !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Failed to remove product.');
    }
  };


  const handleOrderClick = (productId: string, productTitle: string) => {
    const encodedTitle = encodeURIComponent(productTitle);
    navigate(`/${encodedTitle}/${productId}/order`); 
  };

  return (
 <>
 <HeaderComponent/>
 <section className="container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold">Product Details Fetched:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {productResponses.map((response, index) => (
            <li key={index}>
              {response?.result ? (
                <>
           
                  {response.result.images && response.result.images.length > 0 && (
                    <img
                      src={`${baseURL}${encodeURIComponent(response.result.images[0])}`} 
                      alt={response.result.title} 
                      className="w-50 h-50 object-cover mb-2" 
                    />
                  )}
                  <p>Product ID: {response.result._id}</p>
                  <p>Title: {response.result.title}</p>
                  <p>Price: {response.result.price}</p>
                  <p>Summary: {response.result.summary}</p>
                  <p>Description: {response.result.description}</p>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2" 
                    onClick={() => handleOrderClick(response.result._id, response.result.title)} 
                  >
                    Order
                  </button>

                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded mt-4" 
                    onClick={() => handleRemoveProduct(response.result._id)}
                  >
                    Remove
                  </button>
                  <hr className="my-4" />
                </>
              ) : (
                <p>Error: Product data is not available</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
 <FooterComponent/></>
  );
};

export default CartPage;

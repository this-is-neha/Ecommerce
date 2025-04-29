import React, { useEffect, useState, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from 'axios';
import { HeaderComponent, FooterComponent } from '../../components/common';

interface Order {
  _id: string;
  productId: string;
  fullName: string;
  phoneNumber: string;
  region: string;
  city: string;
  area: string;
  address: string;
  status: string;
}

interface Product {
  description: ReactNode;
  _id: string;
  title: string;
  price: number;
  images: string;
  summary: string;
}

const baseURLl = import.meta.env.VITE_API_BASE_URL;

const UserOrders = () => {
  const { userId } = useParams<{ userId: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productImagesBaseURL = `${baseURLl}/public/uploads/product`;

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!userId) {
        setError('User ID is missing.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axiosInstance.get(`${baseURLl}/order/users/${userId}`);
        console.log('Orders response:', response);
  
        // Here response is the orders array itself
        const ordersArray = Array.isArray(response.data) ? response.data : [];
  console.log('Orders array:', ordersArray);
        setOrders(ordersArray);
  
        const productIds = Array.from(new Set(ordersArray.map(order => order.productId)));
        const token = localStorage.getItem("accessToken") || null;
  
        const productResponses = await Promise.all(
          productIds.map(productId =>
            axiosInstance.get(`${baseURLl}/product/${productId}`, {
              headers: { Authorization: `Bearer ${token}` }
            }).catch(err => {
              console.error(`Error fetching product ${productId}:`, err);
              return null;
            })
          )
        );
  
        const productsData = productResponses.reduce((acc, resp) => {
          if (resp && resp.data && resp.data._id) {
            acc[resp.data._id] = resp.data;
          }
          return acc;
        }, {} as { [key: string]: Product });
  
        setProducts(productsData);
      } catch (err) {
        console.error(err);
        setError('Error fetching user orders.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserOrders();
  }, [userId]);

  const handleViewProduct = async (productId: string) => {
        try {
            const token = localStorage.getItem("accessToken") || null;
            const response = await axiosInstance.get(`${baseURLl}/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedProductId(productId);
            setProducts(prev => ({ ...prev, [productId]: response.data.data.result }));
        } catch (err) {
            console.error('Error fetching product details:', err);
        }
    };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;
  if (!orders.length) return <div>No orders found.</div>;

  return (
    <>
      <HeaderComponent />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-4">Your Orders</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {orders.map(order => (
            <div key={order._id} className="mb-4 border-b pb-4">
              <strong>Order ID:</strong> {order._id} <br />
              <strong>Product ID:</strong> {order.productId}
              <button
                onClick={() => handleViewProduct(order.productId)}
                className="ml-2 px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                View Product
              </button>
              <br />
              {products[order.productId]?.images && (
                <img
                  src={`${productImagesBaseURL}/${products[order.productId].images}`}
                  alt={products[order.productId].title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <strong>Full Name:</strong> {order.fullName} <br />
              <strong>Phone Number:</strong> {order.phoneNumber} <br />
              <strong>Region:</strong> {order.region} <br />
              <strong>City:</strong> {order.city} <br />
              <strong>Area:</strong> {order.area} <br />
              <strong>Address:</strong> {order.address} <br />

              {selectedProductId === order.productId && products[order.productId] && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Product Details</h3>
                  <p><strong>Title:</strong> {products[order.productId].title}</p>
                  <p><strong>Price:</strong> ${products[order.productId].price}</p>
                  <p><strong>Description:</strong> {products[order.productId].description}</p>
                  <p><strong>Summary:</strong> {products[order.productId].summary}</p>
                  {products[order.productId].images && (
                    <img
                      src={`${productImagesBaseURL}/${products[order.productId].images}`}
                      alt={products[order.productId].title}
                      className="w-40 h-40 object-cover rounded mt-2"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default UserOrders;

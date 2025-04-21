
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import { toast } from "react-toastify";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

const OrderListing = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/order", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      console.log("Full Response:", response);
      // Assuming response.data contains the orders
      const ordersData = response; // Access the correct data from response
      console.log("Orders Data:", ordersData);

      setOrders(ordersData);
    } catch (error: any) {
      console.error("Error fetching orders:", error.response?.data || error);
      toast.error("Error fetching orders...");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this order?");
      if (!confirmation) return;

      await axiosInstance.delete(`/order/${orderId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      // Filter out the deleted order from the state
      setOrders(orders.filter(order => order._id !== orderId));
      toast.success("Order deleted successfully");
    } catch (error: any) {
      console.error("Error deleting order:", error.response?.data || error);
      toast.error("Error deleting order...");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
    <HeaderComponent/>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order Listing</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Product ID</th>
              <th className="px-4 py-2 border">Full Name</th>
              <th className="px-4 py-2 border">Phone Number</th>
              <th className="px-4 py-2 border">Region</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">Area</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Delivery Label</th>
              <th className="px-4 py-2 border">Delivery Method</th>
       
              <th className="px-4 py-2 border">Created At</th>
 
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2 border">
                  <Link to={`${order._id}`} className="text-blue-500 hover:underline">
                    {order._id}
                  </Link>
                </td>
                <td className="px-4 py-2 border">
                  <Link to={`${order.productId}`} className="text-blue-500 hover:underline">
                    {order.productId}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{order.fullName}</td>
                <td className="px-4 py-2 border">{order.phoneNumber}</td>
                <td className="px-4 py-2 border">{order.region}</td>
                <td className="px-4 py-2 border">{order.city}</td>
                <td className="px-4 py-2 border">{order.area}</td>
                <td className="px-4 py-2 border">{order.address}</td>
                <td className="px-4 py-2 border">{order.deliveryLabel}</td>
                <td className="px-4 py-2 border">{order.deliveryOption}</td>
           
                
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <FooterComponent/>
    </>
  );
};

export default OrderListing;

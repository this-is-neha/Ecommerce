import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import { HeaderComponent, FooterComponent } from "../../components/common";
import * as yup from "yup";
import React from "react";

const schema = yup.object().shape({
  orderId: yup.string(),
  fullName: yup.string().required("Full name is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  region: yup.string().required("Please choose your region"),
  city: yup.string().required("Please choose your city"),
  area: yup.string().required("Please choose your area"),
  address: yup.string().required("Address is required"),
});

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderIdd, setOrderIdd] = useState<string>("");
  const [orderFullname, setOrderFullname] = useState<string>("");
  const [orderAddress, setOrderAddress] = useState<string>("");
  const [orderPhone, setOrderPhone] = useState<string>("");
  const [orderCity, setOrderCity] = useState<string>("");
  const [orderRegion, setOrderRegion] = useState<string>("");
  const [orderProductId, setOrderProductId] = useState<string>("");
  const [orderDeliveryOption, setOrderDeliveryOption] = useState<string>("");
  const [orderDeliveryLabel, setOrderDeliveryLabel] = useState<string>("");
  const [orderImage, setOrderImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const baseURL = "http://127.0.0.1:5500/public/uploads/product/";

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        console.error("Order ID is undefined");
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authorization token missing");
        }

        const orderResponse = await axiosInstance.get(`order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrderIdd(orderResponse._id);
        setOrderFullname(orderResponse.fullName);
        setOrderPhone(orderResponse.phoneNumber);
        setOrderAddress(orderResponse.address);
        setOrderCity(orderResponse.city);
        setOrderRegion(orderResponse.region);
        setOrderProductId(orderResponse.productId);
        setOrderDeliveryOption(orderResponse.deliveryOption);
        setOrderDeliveryLabel(orderResponse.deliveryLabel);
        setOrderImage(orderResponse.image);

        const productResponse = await axiosInstance.get(
          `product/${orderResponse.productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProductDetails(productResponse.result);
      } catch (error: any) {
        console.error(
          "Error fetching order details:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleNavigate = () => {
    navigate("payment-success"); 
  };

  return (
    <>
     <HeaderComponent/>
     
      <div className="h-[2400px] flex flex-col justify-center items-center bg-blue-100 p-8">
        {loading ? (
          <p>Loading order details...</p>
          
        ) : (
          
          <div className="bg-white p-8 mt-[20px] w-[1000px] rounded-lg shadow-lg w-full max-w-xl">

            <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
            <h3 className="text-xl font-semibold">Order ID: {orderIdd}</h3>
            <h3 className="text-xl font-semibold">Full Name: {orderFullname}</h3>
            <h3 className="text-xl font-semibold">Phone Number: {orderPhone}</h3>
            <h3 className="text-xl font-semibold">Region: {orderRegion}</h3>
            <h3 className="text-xl font-semibold">City: {orderCity}</h3>
            <h3 className="text-xl font-semibold">Address: {orderAddress}</h3>
            <h3 className="text-xl font-semibold">Product ID: {orderProductId}</h3>
            <h3 className="text-xl font-semibold">
              Delivery Label: {orderDeliveryLabel}
            </h3>
            <h3 className="text-xl font-semibold">
              Delivery Method: {orderDeliveryOption}
            </h3>

            {orderImage && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Uploaded Image:</h3>
                <img
                  src={orderImage}
                  alt="Uploaded"
                  className="w-full h-auto mt-2"
                />
              </div>
            )}

            {productDetails && (
              <div className="bg-white p-8  w-[1000px] rounded-lg shadow-lg w-full max-w-lg mt-6">
                <h3 className="text-2xl font-semibold mb-6">Product Details:</h3>
                <p>
                  <strong>Name:</strong> {productDetails.title}
                </p>
                <p>
                  <strong>Description:</strong> {productDetails.description}
                </p>
                <p>
                  <strong>Price:</strong> ${productDetails.price}
                </p>
                <p>
                  <strong>Discount:</strong> ${productDetails.discount}
                </p>
                <p>
                  <strong>Summary:</strong> {productDetails.summary}
                </p>

                {productDetails.images && productDetails.images.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold">Product Image:</h3>
                    <img
                      src={`${baseURL}${productDetails.images[0]}`}
                      alt="Product"
                      className="w-full h-auto mt-2"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Add button to navigate to another page */}
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNavigate}
            >
              View Payment 
            </button>
          </div>
        )}
      </div>
    <FooterComponent/>
    </>
  );
};

export default OrderDetail; 

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "axios";
import { HeaderComponent, FooterComponent } from "../../components/common";
import * as yup from "yup";


const baseURLl = import.meta.env.VITE_API_BASE_URL;

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
  const [productDetails, setProductDetails] = useState<any>(null);
  const baseURL = "../../../uploads/product/";

  const navigate = useNavigate();

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

        const orderResponse = await axiosInstance.get(`${baseURLl}/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Order response full:", orderResponse);
        console.log("Order response data:", orderResponse.data.data);
        
        const orderData = orderResponse?.data.data.result ?? orderResponse;
        
        if (!orderData || !orderData._id) {
          throw new Error("Order data is missing or invalid");
        }
        
        setOrderIdd(orderData._id);
        setOrderFullname(orderData.fullName);
        setOrderPhone(orderData.phoneNumber);
        setOrderAddress(orderData.address);
        setOrderCity(orderData.city);
        setOrderRegion(orderData.region);
        setOrderProductId(orderData.productId);
        setOrderDeliveryOption(orderData.deliveryOption);
        setOrderDeliveryLabel(orderData.deliveryLabel);
        setOrderImage(orderData.image);
        
        const productResponse = await axiosInstance.get(`product/${orderData.productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const productData = productResponse?.data.data.result ?? productResponse;
        
        setProductDetails(productData);
        

        

        
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
      <HeaderComponent />

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
            <h3 className="text-xl font-semibold">Delivery Label: {orderDeliveryLabel}</h3>
            <h3 className="text-xl font-semibold">Delivery Method: {orderDeliveryOption}</h3>

            {orderImage && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Uploaded Image:</h3>
                <img src={`${baseURL}${orderImage}`} alt="Uploaded" className="w-full h-auto mt-2" />
              </div>
            )}


           

            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNavigate}
            >
              View Payment
            </button>
          </div>
        )}
      </div>

      <FooterComponent />
    </>
  );
};

export default OrderDetail;

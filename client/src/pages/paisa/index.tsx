import { useState, useEffect } from "react";
import { HeaderComponent, FooterComponent } from "../../components/common";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config"; 
import { useParams, useNavigate, useLocation } from "react-router-dom";
import React from "react";

const PaymentPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [mobileBankDetails, setMobileBankDetails] = useState({ bank: "", accountNumber: "" });
  
  // Extract order details from location.state
  const orderDetails = location.state?.order; // Ensure optional chaining to avoid errors
  const { order, orderId } = location.state || {};
  const [customerName, setCustomerName] = useState(orderDetails?.fullName || "");
  const [customerAddress, setCustomerAddress] = useState(`${orderDetails?.city || ""}, ${orderDetails?.area || ""}`);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authorization token missing");
        }

        const response = await axiosInstance.get(`/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Product Details:", response.result);
        setProductName(response.result.title);
        setProductDescription(response.result.description);
        setProductPrice(response.result.price);
        setProductImage(response.result.image);
      } catch (error:any) {
        console.error("Error fetching product details:", error.response ? error.response.data : error.message);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          console.warn("No order ID provided.");
          return; // Exit if there is no orderId
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authorization token missing");
        }

        const response = await axiosInstance.get(`/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Order Details:", response);
        // Update any necessary state from the order details if needed
      } catch (error:any) {
        console.error("Error fetching order details:", error.response ? error.response.data : error.message);
        toast.error("Failed to fetch order details.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePaymentSubmit = async () => {
    try {
      console.log("Payment details submitted:", {
        productId,
        productName,
        productDescription,
        productPrice,
        productImage,
        method: selectedMethod,
        mobileBankDetails: selectedMethod === "mobileBank" ? mobileBankDetails : null,
        orderId,
        customerName,
        customerAddress,
      });

      // Navigate to ImageUploadPage with orderId as a parameter
      navigate(`/${productName}/${productId}/order/payment/${orderId}`); // Update with the correct path
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6">Product: {productName}</h2>
          <h2 className="text-2xl font-semibold mb-6">Choose Payment Method</h2>
          
          {/* Order Details Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Order Details</h3>

            <p><strong>Customer Name:</strong> {customerName}</p>
            <p><strong>Address:</strong> {customerAddress}</p>
            <p><strong>Order ID:</strong> {orderId}</p>
          </div>

          {/* Payment Methods */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <input
                type="radio"
                value="eSewa"
                checked={selectedMethod === "eSewa"}
                onChange={() => setSelectedMethod("eSewa")}
                className="mr-2"
              />
              eSewa
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <input
                type="radio"
                value="khalti"
                checked={selectedMethod === "khalti"}
                onChange={() => setSelectedMethod("khalti")}
                className="mr-2"
              />
              Khalti
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <input
                type="radio"
                value="cash"
                checked={selectedMethod === "cash"}
                onChange={() => setSelectedMethod("cash")}
                className="mr-2"
              />
             Cash On Delivery
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              <input
                type="radio"
                value="mobileBank"
                checked={selectedMethod === "mobileBank"}
                onChange={() => setSelectedMethod("mobileBank")}
                className="mr-2"
              />
              Mobile Banking
            </label>
            {selectedMethod === "mobileBank" && (
              <div>
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={mobileBankDetails.bank}
                  onChange={(e) =>
                    setMobileBankDetails({ ...mobileBankDetails, bank: e.target.value })
                  }
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={mobileBankDetails.accountNumber}
                  onChange={(e) =>
                    setMobileBankDetails({ ...mobileBankDetails, accountNumber: e.target.value })
                  }
                  className="border border-gray-300 p-2 w-full rounded-md mt-2"
                />
              </div>
            )}
          </div>

          <button
            onClick={handlePaymentSubmit}
            className="w-full bg-green-500 text-white p-2 mt-4 rounded-md"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default PaymentPage;

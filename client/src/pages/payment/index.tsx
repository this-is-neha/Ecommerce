import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../config/axios.config";
import { HeaderComponent, FooterComponent } from "../../components/common";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

const schema = yup.object().shape({
  user: yup.string(),
  productId: yup.string(),
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

const ProductOrderPage = () => {
  const { productId } = useParams();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [productName, setProductName] = useState("");
  const [deliveryLabel, setDeliveryLabel] = useState("HOME");
  const [selectedOption, setSelectedOption] = useState("Express");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Fetch the logged-in user details
  const getLoggedInUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.result;
      setLoggedInUser(user._id);
      setValue("user", user._id); // Set the user field value dynamically
    } catch (error) {
      console.error("Error fetching logged-in user:", error);
    }
  };

  // Fetch product details
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
      } catch (error: any) {
        console.error("Error fetching product details:", error.response ? error.response.data : error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Fetch the logged-in user on component mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getLoggedInUser();
    }
  }, []);

  const onSubmit = async (formData: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authorization token missing");
      }

      const orderData = {
        ...formData,
        deliveryLabel,
        deliveryOption: selectedOption,
        productId,
      };

      console.log("Submitting Order Data:", orderData);

      const response = await axiosInstance.post("/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { order, orderId } = response;

      if (orderId) {
        console.log('Order ID:', orderId);
        navigate(`/${productName}/${productId}/order/payment`, {
          state: {
            order,
            orderId
          }
        });
      }

    } catch (error: any) {
      console.error("Error placing order:", error.response ? error.response.data : error.message);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <>
      <HeaderComponent />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
          {loggedInUser ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">User ID</label>
                <input
                  {...register("user")}
                  value={loggedInUser}  // Use loggedInUser directly in the value prop
                  readOnly
                  className="border border-gray-300 p-2 w-full rounded-md bg-gray-100"
                />
                {errors.user && <p className="text-red-600">{errors.user.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product ID</label>
                <input
                  value={productId} // Set the value to productId
                  readOnly // Make the input read-only
                  className="border border-gray-300 p-2 w-full rounded-md bg-gray-100"
                />
              </div>

              {/* Additional form fields for full name, phone number, region, etc. */}

                          {/* Additional form fields here */}
             <div className="mb-4">
               <label className="block text-sm font-medium mb-1">Full Name</label>
               <input
                {...register("fullName")}
                placeholder="Enter your first and last name"
                className="border border-gray-300 p-2 w-full rounded-md"
              />
              {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                {...register("phoneNumber")}
                placeholder="Please enter your phone number"
                className="border border-gray-300 p-2 w-full rounded-md"
              />
              {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Region</label>
              <select {...register("region")} className="border border-gray-300 p-2 w-full rounded-md">
                <option value="">Please choose your region</option>
                <option value="Region1">Region 1</option>
                <option value="Region2">Region 2</option>
              </select>
              {errors.region && <p className="text-red-600">{errors.region.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <select {...register("city")} className="border border-gray-300 p-2 w-full rounded-md">
                <option value="">Please choose your city</option>
                <option value="City1">City 1</option>
                <option value="City2">City 2</option>
              </select>
              {errors.city && <p className="text-red-600">{errors.city.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Area</label>
              <select {...register("area")} className="border border-gray-300 p-2 w-full rounded-md">
                <option value="">Please choose your area</option>
                <option value="Area1">Area 1</option>
                <option value="Area2">Area 2</option>
              </select>
              {errors.area && <p className="text-red-600">{errors.area.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                {...register("address")}
                placeholder="For Example: House# 123, Street# 123, ABC Road"
                className="border border-gray-300 p-2 w-full rounded-md"
              />
              {errors.address && <p className="text-red-600">{errors.address.message}</p>}
            </div>

            <h3 className="text-lg font-semibold mb-2">Select a label for effective delivery:</h3>
            <div className="flex mb-4">
              <button
                type="button"
                onClick={() => setDeliveryLabel("OFFICE")}
                className={`flex-1 p-2 rounded-md ${deliveryLabel === "OFFICE" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Office
              </button>
              <button
                type="button"
                onClick={() => setDeliveryLabel("HOME")}
                className={`flex-1 p-2 rounded-md ${deliveryLabel === "HOME" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Home
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Choose your delivery option:</h3>
            <div className="mb-4">
              <input
                type="radio"
                value="Express"
                checked={selectedOption === "Express"}
                onChange={() => setSelectedOption("Express")}
              />
              <label className="ml-2">Rs. 70 Express Delivery</label>
            </div>
            <div className="mb-4">
              <input
                type="radio"
                value="Standard"
                checked={selectedOption === "Standard"}
                onChange={() => setSelectedOption("Standard")}
              />
              <label className="ml-2">Rs. 70 Standard Delivery</label>
            </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 mt-4 rounded-md"
              >
                Proceed to Payment
              </button>
            </form>
          ) : (
            <p>Loading...</p> // Show a loading message until user data is available
          )}
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default ProductOrderPage;

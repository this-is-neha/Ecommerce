import { useState, useEffect } from "react";
import * as yup from "yup";
import axiosInstance from "../../config/axios.config";
import { HeaderComponent, FooterComponent } from "../../components/common";
import { useParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const schema = yup.object().shape({
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

const OrderDetail = () => {
  const { productId } = useParams();
  console.log("Product ID:", productId);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productSummary, setProductsummary] = useState("");
  const [productDiscount, setProductdiscount] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        console.error("Product ID is undefined");
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Authorization token missing");

        // Fetch product details
        const response = await axiosInstance.get(`${baseURL}/product/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log the full axios response and data
        console.log("Full response:", response);
        console.log("Response data:", response.data);

        // Depending on your axios config, data might be wrapped in 'result'
        // Check and use accordingly
        const product = response.data?.result || response.data.result || null;

        if (!product) {
          console.error("No product data in response");
          return;
        }

        // Set state from product details
        setProductName(product.title || "");
        setProductDescription(product.description || "");
        setProductPrice(product.price || "");
        setProductImage(product.image || "");
        setProductsummary(product.summary || "");
        setProductdiscount(product.discount || "");
      } catch (error: any) {
        console.error(
          "Error fetching product details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <HeaderComponent />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold mb-6">Product Details</h2>
          <h3 className="text-xl font-semibold">Product Name: {productName}</h3>
          <h3 className="text-xl font-semibold">Product Description: {productDescription}</h3>
          <h3 className="text-xl font-semibold">Product Summary: {productSummary}</h3>
          <h3 className="text-xl font-semibold">Product Price: {productPrice}</h3>
          <h3 className="text-xl font-semibold">Product Discount: {productDiscount}</h3>
          <h3 className="text-xl font-semibold">Product Image: {productImage}</h3>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default OrderDetail;


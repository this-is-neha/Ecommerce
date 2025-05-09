import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import * as yup from 'yup';
import axiosInstance from 'axios';
import React from 'react';
const baseURLL = import.meta.env.VITE_API_BASE_URL;
const schema = yup.object().shape({
    orderId: yup.string(),
    fullName: yup.string().required('Full name is required'),
    phoneNumber: yup
        .string()
        .matches(/^[0-9]+$/, 'Phone number must be digits only')
        .required('Phone number is required'),
    region: yup.string().required('Please choose your region'),
    city: yup.string().required('Please choose your city'),
    area: yup.string().required('Please choose your area'),
    address: yup.string().required('Address is required'),
});

const PaymentSuccessPage = () => {
    const location = useLocation();
    const { orderId } = useParams(); // Use orderId from route params

    const [orderFullname, setOrderFullname] = useState<string>('');
    const [orderAddress, setOrderAddress] = useState<string>('');
    const [orderPhone, setOrderPhone] = useState<string>('');
    const [orderCity, setOrderCity] = useState<string>('');
    const [orderRegion, setOrderRegion] = useState<string>('');
    const [orderProductId, setOrderProductId] = useState<string>('');
    const [orderDeliveryOption, setOrderDeliveryOption] = useState<string>('');
    const [orderDeliveryLabel, setOrderDeliveryLabel] = useState<string>('');
    const [orderImage, setOrderImage] = useState<string>(''); 
    const [uploadedImageUrl, setUploadedImageUrl] = useState<{ orderId: string; images: string[] } | null>(null);
    // State for uploaded image URL
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState<any>(null); // State for product details
    const baseURL = `${baseURLL}/uploads/`;
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                console.error('Order ID is undefined');
                return;
            }

            try {
                setLoading(true);
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Authorization token missing');

       

                const orderResponse = await axiosInstance.get(`order/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  

                  setOrderFullname(orderResponse.data.fullName);
                  setOrderPhone(orderResponse.data.phoneNumber);
                  setOrderAddress(orderResponse.data.address);
                  setOrderCity(orderResponse.data.city);
                  setOrderRegion(orderResponse.data.region);
                  setOrderProductId(orderResponse.data.productId);
                  setOrderDeliveryOption(orderResponse.data.deliveryOption);
                  setOrderDeliveryLabel(orderResponse.data.deliveryLabel);
                  
                
                  const productResponse = await axiosInstance.get(`product/${orderResponse.data.productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  
                  setProductDetails(productResponse.data.result);
                  
              
                  const allImagesResponse = await axiosInstance.get(`${baseURLL}/confrom`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  console.log('All Images Response:', allImagesResponse);
                  
                  
                  const imageResponse = await axiosInstance.get(`${baseURLL}/confrom/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  console.log('Image Response:', imageResponse);
                  
                  // Again .data
                  setUploadedImageUrl(imageResponse.data);
                  console.log("Image is ", imageResponse.data)
                
            } catch (error: any) {
                console.error('Error fetching order details:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-gray-700">You have paid successfully.</p>
            <p className="text-gray-700">Order ID: {orderId}</p>



{uploadedImageUrl?.images?.length ? (
  <div className="mt-4">
    <h3 className="text-2xl font-bold mb-2">Uploaded Payment Image:</h3> 
    <img
      src={`${baseURL}${uploadedImageUrl.images[0]}`}
      alt="Uploaded payment screenshot"
      className="w-[1000px] h-[700px] object-cover border-2 border-gray-300 rounded-lg" 
    />
  </div>
) : (
  <p>No image uploaded.</p>
)}

        </div>
    );
};

export default PaymentSuccessPage;

import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import * as yup from 'yup';
import axiosInstance from '../../config/axios.config';
import React from 'react';

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
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(''); // State for uploaded image URL
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState<any>(null); // State for product details
    const baseURL = "http://127.0.0.1:5500/public/uploads/";
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

                // Fetch order details
                const orderResponse = await axiosInstance.get(`order/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrderFullname(orderResponse.fullName);
                setOrderPhone(orderResponse.phoneNumber);
                setOrderAddress(orderResponse.address);
                setOrderCity(orderResponse.city);
                setOrderRegion(orderResponse.region);
                setOrderProductId(orderResponse.productId);
                setOrderDeliveryOption(orderResponse.deliveryOption);
                setOrderDeliveryLabel(orderResponse.deliveryLabel);

                // Fetch product details
                const productResponse = await axiosInstance.get(`product/${orderResponse.productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProductDetails(productResponse.result);

                // Fetch image URL associated with the orderId
               
                // Fetch all images
                const allImagesResponse = await axiosInstance.get('/confrom', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('All Images Response:', allImagesResponse); 


                console.log(orderId)
                const imageResponse = await axiosInstance.get(`/confrom/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Image Response:', imageResponse);
                setUploadedImageUrl(imageResponse.images); 
                
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


{uploadedImageUrl ? (
    <div className="mt-4">
        <h3 className="text-2xl font-bold mb-2">Uploaded Payment Image:</h3> {/* Increased text size */}
        <img
            src={`${baseURL}${uploadedImageUrl}`}
            alt="Uploaded payment screenshot"
            className="w-[1000px] h-[700px] object-cover border-2 border-gray-300 rounded-lg" // Custom size for larger image// Increased size
        />
    </div>
) : (
    <p>No image uploaded.</p>
)}

        </div>
    );
};

export default PaymentSuccessPage;

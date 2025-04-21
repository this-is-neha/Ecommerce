

import { useEffect, useState } from 'react';
import esewa from '../../../src/assets/esewa.jpg';
import axiosInstance from '../../config/axios.config';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FooterComponent, HeaderComponent } from '../../components/common';

const ImageUploadPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().required('Please upload an image'),
    orderId: Yup.string().required('Order ID is required'),
  });

  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (orderId) {
      setValue('orderId', orderId); 
      fetchOrderDetails(orderId); 
    }
  }, [orderId, setValue]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await axiosInstance.get(`orders/${orderId}`); // Adjust the endpoint accordingly
      console.log('Order details fetched successfully:', response.data);
      // Log the details to the console
      console.log('Full Name:', response.data.fullName);
      console.log('Phone Number:', response.data.phoneNumber);
      console.log('Region:', response.data.region);
      console.log('City:', response.data.city);
      console.log('Area:', response.data.area);
      console.log('Address:', response.data.address);
      console.log('Delivery Label:', response.data.deliveryLabel);
      console.log('Delivery Method:', response.data.deliveryOption);
      console.log('Status:', response.data.status);
      console.log('Created At:', new Date(response.data.createdAt).toLocaleDateString());
    } catch (error: any) {
      console.error('Error fetching order details:', error.response?.data || error.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setValue('image', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const onSubmit = async () => {
    console.log('Submitting form...');
    console.log('Selected image:', image);

    if (!image) {
      alert('Please select an image before submitting!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('orderId', orderId); 

    try {
      const response = await axiosInstance.post('/confrom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { imageUrl } = response; 
      console.log('File uploaded successfully:', response);
      // navigate(`/admin/orderlist/${orderId}/payment-success`, { state: { orderId, uploadedImageUrl: imageUrl } });
      navigate ('/')
      setUploadedImageUrl(imageUrl);
      setShowModal(true);
      
    } catch (error: any) {
      console.error('Upload error:', error.response?.data || error.message);
      alert('Error uploading the image!');
      setShowModal(false);
    }
  };

  return (
<>
<HeaderComponent/>
<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan the QR to pay</h1>

      <div className="flex justify-center items-center w-full h-1/2">
        <img src={esewa} className="w-[50rem] h-[35rem] object-contain" alt="Esewa" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mt-10 mb-1">Order ID</label>
        <input
          value={orderId} 
          readOnly
          className="border border-gray-300 p-2 w-full rounded-md bg-gray-100"
        />
      </div>

      <h2 className="mt-10">Image/Screenshot of the payment details</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full max-w-xs text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mt-6"
      />
      {errors.image && <span className="text-red-500">{errors.image.message}</span>}

      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover" />
        </div>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl font-medium mb-4">Payment Successful!</p>
            <p className="text-gray-700">You have paid successfully.</p>
            <p className="text-gray-700">Order ID: {orderId}</p>
            {uploadedImageUrl && (
              <div className="mt-4">
                <img src={uploadedImageUrl} alt="Uploaded" className="w-40 h-40 object-cover" />
                <p className="text-sm text-gray-500">Uploaded Image</p>
              </div>
            )}
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
<FooterComponent/></>
  );
};

export default ImageUploadPage;

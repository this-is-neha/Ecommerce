import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderComponent, FooterComponent } from '../../components/common';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />
      <div className="admin-page-container  bg-gray-200 min-h-[90vh] flex items-center justify-center">
        <div>
        
          <h1 className="text-3xl font-bold mb-10 min-w-[800px] text-center">
            WELCOME TO THE ADMIN PAGE !!!!!!
          </h1>
          <br />
          <br />
          <br />
          <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
          <div className="flex flex-col gap-8">
            <button
              onClick={() => navigate(`/admin/category`)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded min-w-[400px]"
            >
              CATEGORY
            </button>
            <button
              onClick={() => navigate('/admin/brand')}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded"
            >
              BRAND
            </button>
            <button
              onClick={() => navigate('/admin/product')}
              className="bg-red-500 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded"
            >
              PRODUCTS
            </button>
            <button
              onClick={() => navigate('/admin/orderlist')}
              className="bg-orange-500 hover:bg-black-700 text-white font-bold py-4 px-8 rounded"
            >
              ORDER-LIST
            </button>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default AdminPage;

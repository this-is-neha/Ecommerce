// context/BrandContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;
interface Brand {
  _id: string;
  title: string;
}

interface BrandContextType {
  brands: Brand[];
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get(`${baseURL}/brand`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        setBrands(response.data.data.result);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <BrandContext.Provider value={{ brands }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrands = () => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrands must be used within a BrandProvider');
  }
  return context;
};

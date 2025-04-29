

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axiosInstance from '../config/axios.config'; // Adjust the import as necessary
// import { toast } from 'react-toastify';
// const baseURL = import.meta.env.VITE_API_BASE_URL;
// const getCurrentUserId = () => {
//     return localStorage.getItem('userId');
// };

// const CartContext = createContext(null);

// export const useCart = () => {
//     return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//     const userId = getCurrentUserId();
//     const cartKey = userId ? `cartItems_${userId}` : 'cartItems'; 

//     const [cartItems, setCartItems] = useState(() => {
//         const savedCartItems = localStorage.getItem(cartKey);
//         return savedCartItems ? JSON.parse(savedCartItems) : [];
//     });

//     useEffect(() => {
        
//         if (userId) {
//             localStorage.setItem(cartKey, JSON.stringify(cartItems));
//         }
//     }, [cartItems, cartKey, userId]);

//     const addToCart = (item: { _id: any; }) => {
//         setCartItems((prevItems: any[]) => {
//             const exists = prevItems.some((prevItem: { _id: any; }) => prevItem._id === item._id);
//             if (!exists) {
//                 return [...prevItems, item]; 
//             }
//             return prevItems; 
//         });
//     };

//     const removeFromCart = async (itemId: any) => {
//         if (!userId) return;

//         try {
//             const response = await axiosInstance.delete(`${baseURL}/remove/${userId}`, {
//                 data: { productId: itemId } 
//             });

//             if (response.status === 200) {
             
//                 setCartItems((prevItems: any[]) => 
//                     prevItems.filter((item: { _id: any; }) => item._id !== itemId)
//                 );
//                 toast.success('Product removed from cart successfully!'); 
//             } else {
//                 toast.error('Failed to remove product from cart.');
//             }
//         } catch (error) {
//             console.error('Error removing product from cart:', error);
//             toast.error('Failed to remove product from cart.'); 
//         }
//     };

//     const clearCart = () => {
//         setCartItems([]);
//         localStorage.removeItem(cartKey); 
//     };

 
//     const logout = () => {
//         localStorage.removeItem('userId');
//         clearCart(); 
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, setCartItems,removeFromCart, clearCart, logout }}>
//             {children}
//         </CartContext.Provider>
//     );
// };


import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axiosInstance from 'axios'; // Adjust the import as necessary
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getCurrentUserId = () => {
  return localStorage.getItem('userId');
};

// Step 1: Create proper type for context value
interface CartContextType {
  cartItems: any[];
  addToCart: (item: { _id: any }) => void;
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  removeFromCart: (itemId: any) => Promise<void>;
  clearCart: () => void;
  logout: () => void;
}

// Step 2: Create context with correct typing
const CartContext = createContext<CartContextType | null>(null);

// Step 3: Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Step 4: Type children properly
interface CartProviderProps {
  children: ReactNode;
}

// Step 5: CartProvider
export const CartProvider = ({ children }: CartProviderProps) => {
  const userId = getCurrentUserId();
  const cartKey = userId ? `cartItems_${userId}` : 'cartItems';

  const [cartItems, setCartItems] = useState<any[]>(() => {
    const savedCartItems = localStorage.getItem(cartKey);
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, cartKey, userId]);

  const addToCart = (item: { _id: any }) => {
    setCartItems(prevItems => {
      const exists = prevItems.some(prevItem => prevItem._id === item._id);
      if (!exists) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromCart = async (itemId: any) => {
    if (!userId) return;

    try {
      const response = await axiosInstance.delete(`${baseURL}/remove/${userId}`, {
        data: { productId: itemId }
      });

      if (response.status === 200) {
        setCartItems(prevItems =>
          prevItems.filter(item => item._id !== itemId)
        );
        toast.success('Product removed from cart successfully!');
      } else {
        toast.error('Failed to remove product from cart.');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Failed to remove product from cart.');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(cartKey);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems, removeFromCart, clearCart, logout }}>
      {children}
    </CartContext.Provider>
  );
};

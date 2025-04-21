// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext<any>(null);

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }: any) => {
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   const addToCart = (product: any) => {
//     setCartItems((prevItems) => [...prevItems, product]);
//   };

//   const removeFromCart = (productId: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


// import React, { createContext, useContext, useEffect, useState } from 'react';
// const CartContext = createContext<any>(null);

// export const useCart = () => {
//     return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState(() => {
//         // Retrieve cart items from local storage
//         const savedCartItems = localStorage.getItem('cartItems');
//         return savedCartItems ? JSON.parse(savedCartItems) : [];
//     });

//     useEffect(() => {
//         // Save cart items to local storage whenever they change
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     }, [cartItems]);

//     const addToCart = (item: any) => {
//         setCartItems((prevItems: any) => [...prevItems, item]);
//     };

//     const removeFromCart = (itemId: any) => {
//         setCartItems((prevItems: any[]) => prevItems.filter((item: { _id: any; }) => item._id !== itemId));
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };



// import React, { createContext, useContext, useEffect, useState } from 'react';

// // You might already have a way to get the current user ID
// const getCurrentUserId = () => {
//     // Replace this logic with how you get the logged-in user's ID
//     return localStorage.getItem('userId'); // Assume the user ID is stored in local storage after login
// };

// const CartContext = createContext<any>(null);


// export const useCart = () => {
//     return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//     const userId = getCurrentUserId(); // Get the current user ID
//     const cartKey = `cartItems_${userId}`; // Unique key for each user’s cart
//     const [cartItems, setCartItems] = useState(() => {
//         // Retrieve cart items from local storage
//         const savedCartItems = localStorage.getItem(cartKey);
//         return savedCartItems ? JSON.parse(savedCartItems) : [];
//     });

//     useEffect(() => {
//         // Save cart items to local storage whenever they change
//         localStorage.setItem(cartKey, JSON.stringify(cartItems));
//     }, [cartItems, cartKey]);

//     const addToCart = (item: any) => {
//         setCartItems((prevItems: any) => [...prevItems, item]);
//     };

//     const removeFromCart = (itemId: any) => {
//         setCartItems((prevItems: any[]) => prevItems.filter((item: { _id: any; }) => item._id !== itemId));
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// import React, { createContext, useContext, useEffect, useState } from 'react';

// // Function to get the current user ID from local storage
// const getCurrentUserId = () => {
//     return localStorage.getItem('userId'); // Assume user ID is stored upon login
// };

// const CartContext = createContext(null);

// export const useCart = () => {
//     return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//     const userId = getCurrentUserId();
//     const cartKey = userId ? `cartItems_${userId}` : 'cartItems'; // Unique key for each user’s cart

//     const [cartItems, setCartItems] = useState(() => {
//         // Load the user's cart items from local storage
//         const savedCartItems = localStorage.getItem(cartKey);
//         return savedCartItems ? JSON.parse(savedCartItems) : [];
//     });

//     useEffect(() => {
//         // Save cart items to local storage whenever they change
//         if (userId) {
//             localStorage.setItem(cartKey, JSON.stringify(cartItems));
//         }
//     }, [cartItems, cartKey, userId]);

//     const addToCart = (item: { _id: any; }) => {
//         // Prevent adding duplicate items to the cart
//         setCartItems((prevItems: any[]) => {
//             const exists = prevItems.some((prevItem: { _id: any; }) => prevItem._id === item._id);
//             if (!exists) {
//                 return [...prevItems, item]; // Add item only if it doesn't exist
//             }
//             return prevItems; // Return existing items if it already exists
//         });
//     };

//     const removeFromCart = (itemId: any) => {
//         setCartItems((prevItems: any[]) => prevItems.filter((item: { _id: any; }) => item._id !== itemId));
//     };

//     const clearCart = () => {
//         setCartItems([]);
//         localStorage.removeItem(cartKey); // Clear cart from local storage
//     };

//     // Optional: Add a logout function to clear the cart
//     const logout = () => {
//         localStorage.removeItem('userId');
//         clearCart(); // Clear cart when logging out
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, logout }}>
//             {children}
//         </CartContext.Provider>
//     );
// };


// import React, { createContext, useContext, useEffect, useState } from 'react';

// const getCurrentUserId = () => {
//     return localStorage.getItem('userId'); // Get user ID from local storage
// };

// const CartContext = createContext(null);

// export const useCart = () => {
//     return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//     const userId = getCurrentUserId();
//     const cartKey = userId ? `cartItems_${userId}` : 'cartItems'; // Unique key for each user’s cart

//     const [cartItems, setCartItems] = useState(() => {
//         const savedCartItems = localStorage.getItem(cartKey);
//         return savedCartItems ? JSON.parse(savedCartItems) : [];
//     });

//     useEffect(() => {
//         // Save cart items to local storage whenever they change
//         if (userId) {
//             localStorage.setItem(cartKey, JSON.stringify(cartItems));
//         }
//     }, [cartItems, cartKey, userId]);

//     const addToCart = (item: { _id: any; }) => {
//         setCartItems((prevItems: any[]) => {
//             const exists = prevItems.some((prevItem: { _id: any; }) => prevItem._id === item._id);
//             if (!exists) {
//                 return [...prevItems, item]; // Add item only if it doesn't exist
//             }
//             return prevItems; // Return existing items if it already exists
//         });
//     };

//     const removeFromCart = (itemId: any) => {
//         setCartItems((prevItems: any[]) => prevItems.filter((item: { _id: any; }) => item._id !== itemId));
//     };

//     const clearCart = () => {
//         setCartItems([]);
//         localStorage.removeItem(cartKey); // Clear cart from local storage
//     };

//     // Optional: Add a logout function to clear the cart
//     const logout = () => {
//         localStorage.removeItem('userId');
//         clearCart(); // Clear cart when logging out
//     };

//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, logout }}>
//             {children}
//         </CartContext.Provider>
//     );
// };


import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../config/axios.config'; // Adjust the import as necessary
import { toast } from 'react-toastify';

const getCurrentUserId = () => {
    return localStorage.getItem('userId');
};

const CartContext = createContext(null);

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const userId = getCurrentUserId();
    const cartKey = userId ? `cartItems_${userId}` : 'cartItems'; 

    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem(cartKey);
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        
        if (userId) {
            localStorage.setItem(cartKey, JSON.stringify(cartItems));
        }
    }, [cartItems, cartKey, userId]);

    const addToCart = (item: { _id: any; }) => {
        setCartItems((prevItems: any[]) => {
            const exists = prevItems.some((prevItem: { _id: any; }) => prevItem._id === item._id);
            if (!exists) {
                return [...prevItems, item]; 
            }
            return prevItems; 
        });
    };

    const removeFromCart = async (itemId: any) => {
        if (!userId) return;

        try {
            const response = await axiosInstance.delete(`/remove/${userId}`, {
                data: { productId: itemId } 
            });

            if (response.status === 200) {
             
                setCartItems((prevItems: any[]) => 
                    prevItems.filter((item: { _id: any; }) => item._id !== itemId)
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
        <CartContext.Provider value={{ cartItems, addToCart, setCartItems,removeFromCart, clearCart, logout }}>
            {children}
        </CartContext.Provider>
    );
};

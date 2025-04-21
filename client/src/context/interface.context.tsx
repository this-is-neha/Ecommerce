// types.ts
export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    // Add other product fields as necessary
  }
  
  export interface Order {
    user:string
    orderId: string;
    fullName: string;
    phoneNumber: string;
    region: string;
    city: string;
    area: string;
    address: string;
    deliveryLabel: string;
    deliveryOption: string;
    // Add other order fields as necessary
  }
  
  export interface OrderResponse {
    message: string;
    order: Order;
    product: Product;
  }
  
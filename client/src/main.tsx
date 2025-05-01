import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./config/router.config";

import { LoadingComponent } from "./components/common";
import { AuthProvider } from "./context/auth.context";
import {BrandProvider} from "./context/brand-context";
import  {CartProvider}  from "./context/cart.context"
const htmlRoot: HTMLElement=document.getElementById('root') as HTMLElement;

const RootElement=ReactDOM.createRoot(htmlRoot)

RootElement.render(
  <React.StrictMode>

   <BrandProvider>
 
   
   <BrowserRouter>

  <AuthProvider> <RouterConfig/> </AuthProvider>
 
  
   </BrowserRouter>

 
   </BrandProvider>
   
</React.StrictMode>
)


// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import "@fortawesome/fontawesome-free/css/all.css";
// import { BrowserRouter } from "react-router-dom";
// import RouterConfig from "./config/router.config";
// import { AuthProvider } from "./context/auth.context";
// import { BrandProvider } from "./context/brand-context";
// import { CartProvider } from "./context/cart.context";

// const htmlRoot: HTMLElement = document.getElementById('root') as HTMLElement;

// const RootElement = ReactDOM.createRoot(htmlRoot);

// RootElement.render(
//   <React.StrictMode>
//     <BrandProvider>
//       <CartProvider>
        
//             <BrowserRouter>
//               <AuthProvider>
//                 <RouterConfig />
//               </AuthProvider>
//             </BrowserRouter>
         
//       </CartProvider>
//     </BrandProvider>
//   </React.StrictMode>
// );



// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import "@fortawesome/fontawesome-free/css/all.css";
// import { BrowserRouter } from "react-router-dom";
// import RouterConfig from "./config/router.config";
// import { AuthProvider } from "./context/auth.context";
// import { BrandProvider } from "./context/brand-context";
// import { CartProvider } from "./context/cart.context";
// import StartupCleanup from "../src/context/startcleanup"; // ✅ new import

// const htmlRoot: HTMLElement = document.getElementById('root') as HTMLElement;
// const RootElement = ReactDOM.createRoot(htmlRoot);

// RootElement.render(
//   <React.StrictMode>
//     <StartupCleanup /> 
//     <BrandProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <AuthProvider>
//             <RouterConfig />
//           </AuthProvider>
//         </BrowserRouter>
//       </CartProvider>
//     </BrandProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./config/router.config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store,{persistor} from "./config/store.config"
import { LoadingComponent } from "./components/common";
import { AuthProvider } from "./context/auth.context";
import {BrandProvider} from "./context/brand-context";
import  {CartProvider}  from "./context/cart.context"
const htmlRoot: HTMLElement=document.getElementById('root') as HTMLElement;

const RootElement=ReactDOM.createRoot(htmlRoot)

RootElement.render(
  <React.StrictMode>

   <BrandProvider>
 
   <CartProvider>
   <Provider store ={store}>
    <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
   <BrowserRouter>

  <AuthProvider> <RouterConfig/> </AuthProvider>
 
  
   </BrowserRouter>
   </PersistGate>
   </Provider></CartProvider>
 
   </BrandProvider>
   
</React.StrictMode>
)

// import { configureStore,combineReducers } from "@reduxjs/toolkit";
// import {persistStore,persistReducer} from "redux-persist"

// import bannerReducer from "../reducer/banner.reducer"
// import  storage from "redux-persist/lib/storage"

// const rootReducer=combineReducers({
//    banner:bannerReducer 
// })
// const persistConfig={
//     key:"root",
//     storage
// }

// const persistedReducer=persistReducer(persistConfig,rootReducer)

// const store=configureStore({
//      reducer:persistedReducer
//     })
// export const persistor=persistStore(store);

// export default store

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Your reducers
import bannerReducer from "../reducer/banner.reducer";
import authReducer from "../reducer/authSlice"; // 🆕 Add this line

// Combine all reducers
const rootReducer = combineReducers({
  banner: bannerReducer,
  auth: authReducer, // 🆕 Add this slice
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export store
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;

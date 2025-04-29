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


import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bannerReducer from '../reducer/banner.reducer';  // Make sure the reducer is correctly imported

// Combine your reducers
const rootReducer = combineReducers({
  banner: bannerReducer
});

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store); // Create the persistor
export default store;

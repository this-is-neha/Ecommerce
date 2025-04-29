import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"

import bannerReducer from "../reducer/banner.reducer"
import  storage from "redux-persist/lib/storage"

const rootReducer=combineReducers({
   banner:bannerReducer 
})
const persistConfig={
    key:"root",
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
     reducer:persistedReducer
    })
export const persistor=persistStore(store);

export default store

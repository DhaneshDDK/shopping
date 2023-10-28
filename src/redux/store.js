import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import authSlice from "./Slices/authSlice";
import myProductsSlice from "./Slices/MyProductsSlice";

export const store = configureStore({
    reducer : {
         cart : cartSlice,
         auth : authSlice,
         myproducts : myProductsSlice,
    }
}); 
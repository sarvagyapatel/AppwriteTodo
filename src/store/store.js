import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import authSlice from './authSlice';
const store = configureStore ({
    reducer: {
        todo: todoSlice,
        auth : authSlice,
    } 
})

export default store;
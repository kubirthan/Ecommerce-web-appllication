import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "../src/slices/ProductsSlice";
import productReducer from '../src/slices/ProductSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice'


const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer ,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer
})


const store = configureStore({
    reducer,
})

export default store;
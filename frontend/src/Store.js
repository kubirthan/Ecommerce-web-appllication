import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slices/ProductsSlice'
import productReducer from './slices/ProductSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
    cartState: cartReducer
})


const store = configureStore({
    reducer,
})


export default store
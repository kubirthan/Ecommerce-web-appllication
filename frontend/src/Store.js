import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slices/ProductsSlice'
import productReducer from './slices/ProductSlice'
import authReducer from './slices/authSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer
})


const store = configureStore({
    reducer,
})


export default store
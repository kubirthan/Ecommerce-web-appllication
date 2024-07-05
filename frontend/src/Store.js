import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productsReducer from './slices/ProductsSlice'
import productReducer from './slices/ProductSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer
})


const store = configureStore({
    reducer,
})


export default store
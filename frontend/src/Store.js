import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import productsReducer from './slices/ProductsSlice'


const reducer = combineReducers({
    productsState: productsReducer
})


const store = configureStore({
    reducer,
})


export default store
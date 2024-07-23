import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
        loading: false,
        shippingInfo:  localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): [],
    },
    reducers: {
        addCartItemRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action){
            const item = action.payload

            const isItemExist = state.items.find(i => i.product == item.product)

            if(isItemExist){
                state = {
                    ...state,
                    loading: false,
                }
            }else {
                state = {
                    items: {...state.items,item},
                    loading: false
                }
                localStorage.setItem('cartItems', JSON.stringify(state.items))
            }
            return state
        },
        increasedCartItemQty(state, action) {
            state.action = state.items.map(item => {
                if(item.product == action.payload){
                    item.quantity = item.quantity + 1
                }
                return item
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        decreasedCartItemQty(state, action) {
            state.action = state.items.map(item => {
                if(item.product == action.payload){
                    item.quantity = item.quantity - 1
                }
                return item
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item=> {
                return item.product !== action.payload
            })
            localStorage.setItem( JSON.stringify(filterItems))
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state,action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted(state,action) {
            localStorage.removeItem('shippingInfo')
            localStorage.removeItem('shippingInfo')
            sessionStorage.removeItem('orderInfo')
            return {
                items: [],
                loading: false,
                shippingInfo: [],
            
            }
        }
    }
})

const {actions, reducer} = cartSlice

export const {addCartItemRequest,addCartItemSuccess,increasedCartItemQty,decreasedCartItemQty,removeItemFromCart,saveShippingInfo, orderCompleted} = actions

export default reducer
import axios from 'axios'
import { productsFail, productsRequest, productsSuccess } from '../slices/ProductsSlice'


export const getproducts = (keyword,price,category,currentPage) =>  async(dispatch) => {
    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`

        if(keyword){
            link += `&keyword=${keyword}`
        }
        if(price){
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category){
            link += `&category=${category}`
        }

        const {data} = await axios.get(link)
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))

    }
}
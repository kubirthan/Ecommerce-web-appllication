import axios from 'axios'
import { productFail, productRequest, productSuccess } from '../slices/ProductSlice'


export const getproduct = id =>  async(dispatch) => {
    try {
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message))

    }
}
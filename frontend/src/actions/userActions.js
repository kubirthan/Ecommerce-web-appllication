import {loginFail, loginRequest, loginSuccess} from '../slices/authSlice'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginrRequest())
       const {data} =  await axios.post('/api/v1/login', {email,password})
       dispatch(loginSuccess(data))
        
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}
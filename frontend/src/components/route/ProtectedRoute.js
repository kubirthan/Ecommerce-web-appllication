import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../Layouts/Loader'

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useSelector(state => state.authState)
  
    if(!isAuthenticated && !loading){
        return <Navigate to="/login" />
    }

    if(isAuthenticated){
        return children
    }

    if(loading){
        return <Loader/>
    }

}

export default ProtectedRoute
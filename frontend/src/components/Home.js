import React, { Fragment, useEffect } from 'react'
import MetaData from './Layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getproducts } from '../actions/productsActions'
import Loader from './Layouts/Loader'
import Product from './product/Product'
import {toast} from 'react-toastify'

const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state) => state.productsState)

  useEffect(()=>{
    if(error){
      return  toast.error(error,{
        position: 'bottom-center'
      })
    }
      dispatch(getproducts)
  }, [error])



  return (
    <Fragment>
        {loading ? <Loader/> :
       <Fragment>
      <MetaData title={'Buy Best products '}/>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product => (
            <Product product={product}/>
          ))}
        </div>
      </section>
       </Fragment>
    }
    </Fragment>
  )
}

export default Home
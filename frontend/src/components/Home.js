import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './Layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getproducts } from '../actions/productsActions'
import Loader from './Layouts/Loader'
import Product from './product/Product'
import {toast} from 'react-toastify'
import Pagination from 'react-js-pagination'



const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error, productsCount, resPerPage} = useSelector((state) => state.productsState)
  const [currentPage, setCurrentPage] = useState(1)

  const setcurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo)

  }
  

  useEffect(()=>{
    if(error){
      return  toast.error(error,{
        position: 'bottom-center'
      })
    }
      dispatch(getproducts(null,null,null,null,currentPage))
  }, [error, dispatch, currentPage])



  return (
    <Fragment>
        {loading ? <Loader/> :
       <Fragment>
      <MetaData title={'Buy Best products '}/>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product => (
            <Product col={3} key={product._id} product={product}/>
          ))}
        </div>
      </section>
      {productsCount > 0 && productsCount > resPerPage?
      <div className='d-flex justify-content-center mt-5'>
          <Pagination 
          activePage={currentPage}
          onChange={setcurrentPageNo}
          totalItemsCount={productsCount}
          itemsCountPerPage={resPerPage}
          nextPageText={'Next'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass={'page-item'}
          linkClass={'page-link'}
          />
           
      </div> :  null }
       </Fragment>
    }
    </Fragment>
  )
}

export default Home
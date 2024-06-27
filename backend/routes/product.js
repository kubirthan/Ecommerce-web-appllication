const express = require('express')
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getreviews } = require('../controllers/productControlller')
const router = express.Router()
const {isAutneticatedUser, authorizeroles} = require('../middlewares/authenticate')

router.route('/products').get(isAutneticatedUser,getProducts)
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)
router.route('/review').put(isAutneticatedUser,createReview)
router.route('/reviews').get(getreviews)

//admin routes

router.route('/admin/product/new').post(isAutneticatedUser,authorizeroles('admin'),newProduct)
module.exports = router
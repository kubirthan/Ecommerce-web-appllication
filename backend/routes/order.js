const express = require('express')
const { newOrder, getSingleOrder, myOrders, orders } = require('../controllers/orderController')
const router = express.Router()
const {isAutneticatedUser, authorizeroles} = require('../middlewares/authenticate')

router.route('/order/new').post(isAutneticatedUser,newOrder)
router.route('/order/:id').get(isAutneticatedUser,getSingleOrder)
router.route('/myorders').get(isAutneticatedUser,myOrders)


//admin routes
router.route('/orders').get(isAutneticatedUser,authorizeroles('admin'),orders)

module.exports = router
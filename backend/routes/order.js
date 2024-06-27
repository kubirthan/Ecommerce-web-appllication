const express = require('express')
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController')
const router = express.Router()
const {isAutneticatedUser} = require('../middlewares/authenticate')

router.route('/order/new').post(isAutneticatedUser,newOrder)
router.route('/order/:id').get(isAutneticatedUser,getSingleOrder)
router.route('/myorders').get(isAutneticatedUser,myOrders)


module.exports = router
const express = require('express')
const { newOrder, getSingleOrder } = require('../controllers/orderController')
const router = express.Router()
const {isAutneticatedUser} = require('../middlewares/authenticate')

router.route('/order/new').post(isAutneticatedUser,newOrder)
router.route('/order/:id').get(isAutneticatedUser,getSingleOrder)


module.exports = router
const express = require('express')
const { newOrder } = require('../controllers/orderController')
const router = express.Router()
const {isAutneticatedUser} = require('../middlewares/authenticate')

router.route('/order/new').post(isAutneticatedUser,newOrder)


module.exports = router
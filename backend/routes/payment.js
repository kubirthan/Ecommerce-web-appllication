const express = require('express')
const { isAutneticatedUser } = require('../middlewares/authenticate')
const { processPayment, sendStripApi,  } = require('../controllers/paymentController')
const router = express.Router()

router.route('/payment/process').post(isAutneticatedUser, processPayment)
router.route('/stripeapi').get(isAutneticatedUser, sendStripApi)

module.exports = router
const catchAsynError = require('../middlewares/catchAsyncError')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPayment = catchAsynError(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntent.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metData: {integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendStripApi = catchAsynError(async(req, res, next) => {
    
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})
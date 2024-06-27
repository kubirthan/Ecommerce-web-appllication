const catchasyncrError = require('../middlewares/catchAsyncError')
const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')

//create new order - api/v1/order/new
exports.newOrder = catchasyncrError(async (req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
})


//get single order - api/v1/order/:id
exports.getSingleOrder = catchasyncrError(async (req,res,next)=> {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(!order){
        return next(new ErrorHandler(`Order not found this id ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


//get loggedIn User orders - /api/v1/myorders
exports.myOrders = catchasyncrError(async (req,res,next)=> {
    const orders = await Order.find({user: req.user.id})


    res.status(200).json({
        success: true,
        orders
    })
})

//Admin: Get All Orders - api/v1/orders
exports.orders = catchasyncrError(async (req,res,next)=> {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach(order => {
       totalAmount += order.totalPrice
    })


    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})
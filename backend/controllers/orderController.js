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

//Admin : Update Order / order status - api/v1/order/:id
exports.updateOrder = catchasyncrError(async (req,res,next)=> {
    const order = await Order.findById({user: req.user.id})

    if(order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))

    }

    //updating the product stock of each order item
    order.orderItems.forEach( async orderItem => {
        await updateStock(orderItem.product, order.quantity)
    })

    order.orderStatus = req.body.orderStatus
    order.deliveredAt = Date.now()
    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock (productId, quantity){
    const product = Product.findById(productId)
    product.stock = product.stock - quantity
    product.save({validateBeforeSave: false})
}

//Admin: delete order - api/v1/order/:id
exports.deleteOrder = catchasyncrError(async (req,res,next)=> {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler(`Order not found this id ${req.params.id}`, 404))
    }

    await order.deleteOne()
    res.status(200).json({
        success:true,

})
})
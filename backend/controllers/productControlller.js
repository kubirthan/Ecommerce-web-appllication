const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeature')


//get products - /api/v1/products
exports.getProducts = catchAsyncError(async (req,res,next) => {
    const resPerPage = 3

    
    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter()
    }

    const filterProductsCount = await buildQuery().query.countDocuments({})
    
    const totalProductscount = await Product.countDocuments({})

    let productCount = totalProductscount

    if(filterProductsCount !== totalProductscount) {
        productCount = filterProductsCount
    }

    const products = await buildQuery().paginate(resPerPage).query

    res.status(200).json({
        success:true,
        count: productCount,
        resPerPage,
        products
    })
}  
)

//create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req,res,next) => {

    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//Get single products - /api/vi/product/:id
exports.getSingleProduct = catchAsyncError(async (req,res,next)=> {
    const product = await Product.findById(req.params.id)
 
    if(!product){
        return next(new ErrorHandler('product not found', 400))
    }
    
    res.status(201).json({
     success: true,
     product
    })
 }
 )
//update product - /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
      return res.status(404).json({
          success:false,
          message: "product not found"
      })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      success: true,
      product
    })
})


//delete product - /api/v1/product:id
exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
    const product = Product.findById(req.params.id)

    if(!product){
        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: "Product deleted"
    })

}
)
//create review - api/v1/review
exports.createReview = catchAsyncError(async (req,res,next) => {
    const {productId, rating, comment} = req.body

    const review = {
        user : req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })

    //finding user  review exists
    if(isReviewed){
        //updating the review
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length

    }

    //finding the vaerage of product reviews
    product.ratings = product.reviews.reduce((acc,review) => {
        return review.rating + acc
    },0) / product.reviews.length
    product.ratings = isNaN(product.ratings)?0:product.ratings

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success: true
    })
})

//Get reviews - api/v1/reviews?id={productId}
exports.getreviews = catchAsyncError(async (req,res,next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete review - api/v1/review/delete
exports.deletereview = catchAsyncError(async(req,res,next)=> {
    const product = await Product.findById(req.query.productId)

    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString()  !== req.query.id.toString()
    })

    //number of reviews
    const numOfReviews = reviews.length

    //findintg the average with filtered review
    let ratings = reviews.reduce((acc,review) => {
        return review.rating + acc
    },0) / reviews.length
    ratings = isNaN(ratings)?0:ratings

    //saving the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200).json({
        success: true
    })
})
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeature')


//get products - /api/v1/products
exports.getProducts = catchAsyncError(async (req,res,next) => {
    const resPerPge = 2

    const apiFeature = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPge)

    const products = await apiFeature.query
    res.status(200).json({
        success:true,
        count: products.length,
        products
    })
}  
)

//create product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//Get single products - /api/vi/product/:id
exports.getSingleProduct = async (req,res,next)=> {
   const product = await Product.findById(req.params.id)

   if(!product){
       return next(new ErrorHandler('product not found', 400))
   }

   res.status(201).json({
    success: true,
    product
   })
}

//update product - /api/v1/product/:id
exports.updateProduct = async (req,res,next)=>{
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
}


//delete product - /api/v1/product:id
exports.deleteProduct = async (req,res,next)=>{
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
const Product = require('../models/productModel')

//get products - /api/v1/products
exports.getProducts = async (req,res,next) => {
    const products = await Product.find()
    res.status(200).json({
        success:true,
        count: products.length,
        products
    })
}

//create product - /api/v1/products
exports.newProduct = async (req,res,next) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
}

//Get single products
exports.getSingleProduct = async (req,res,next)=> {
   const product = await Product.findById(req.params.id)

   if(!product){
    return res.status(404).json({
        success: false,
        message: "product not found"
    })
   }

   res.status(201).json({
    success: true,
    product
   })
}
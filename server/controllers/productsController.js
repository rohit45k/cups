const asyncHandler = require("express-async-handler")

const Products = require("../models/productsModel")

const getAllProducts = asyncHandler(async(req, res) => {
    const products = await Products.find();
    res.status(200).json(products)
})

const getSingleProduct = asyncHandler(async(req, res) => {

    const product = await Products.find({ _id : req.params.id});
    res.status(200).json(product)
})

module.exports = {
    getAllProducts,
    getSingleProduct
}
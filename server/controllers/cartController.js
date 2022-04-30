const asyncHandler = require("express-async-handler")

const Cart = require("../models/cartModel")
const Product = require("../models/productsModel")

const getCart = asyncHandler(async(req, res) => {

    if(!req.params.cartId) {
        res.status(400)
        throw new Error("Please provide cart id")
    }

    const cart = await Cart.findById(req.params.cartId)

    if(!cart) {
        res.status(400)
        throw new Error("Cart do not exist")
    }

    res.status(200).json(cart)
})
const setCart = asyncHandler(async(req, res) => {
    
    if(!req.body.prod_id || !req.body.qty) {
        res.status(400)
        throw new Error("Please provide product id and quantity")
    }

    const product = await Product.findById(req.body.prod_id)
    const subtotal = product.price * req.body.qty
    const tax = subtotal/20
    const total = subtotal + tax

    const cart = await Cart.create({
        prod_id: req.body.prod_id,
        qty: req.body.qty,
        subtotal: subtotal,
        tax: tax,
        total: total
    })

    res.status(201).json(cart)

})
const updateCart = asyncHandler(async(req, res) => {
    if(!req.params.cartId) {
        res.status(400)
        throw new Error("Please provide cart id")
    }

    const cart = await Cart.findById(req.params.cartId)

    if(!cart) {
        res.status(400)
        throw new Error("Cart do not exist")
    }

    const product = await Product.findById(req.body.prod_id)
    const subtotal = product.price * req.body.qty
    const tax = subtotal/20
    const total = subtotal + tax
    const updateData = {
        prod_id: req.body.prod_id,
        qty: req.body.qty,
        subtotal: subtotal,
        tax: tax,
        total: total
    }

    const updatedCart = await Cart.findByIdAndUpdate(req.params.cartId, updateData, {new : true})

    res.status(200).json(updatedCart)
})


const deleteCart = asyncHandler(async(req, res) => {
    if(!req.params.cartId) {
        res.status(400)
        throw new Error("Please provide cart id")
    }

    const cart = await Cart.findById(req.params.cartId)

    if(!cart) {
        res.status(400)
        throw new Error("Cart do not exist")
    }

    await cart.remove()

    res.status(200).json({ id: req.params.cartId})
})

module.exports = {
    getCart,
    setCart,
    updateCart, 
    deleteCart
}
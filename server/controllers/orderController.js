const asyncHandler = require("express-async-handler")

const Order = require("../models/orderModel")

const getOrder = asyncHandler(async (req, res) => {
    if(!req.params.orderId) {
        res.status(400)
        throw new Error("Please provide user id")
    }

    const order = await Order.findById(req.params.orderId)

    if(!order) {
        res.status(400)
        throw new Error("Order does not found")
    }

    res.status(200).json(order)
})

const setOrder = asyncHandler(async (req, res) => {
    if(!req.body.user_id || !req.body.cart_id) {
        res.status(400)
        throw new Error("Please provide user id and cart id")
    }

    const order = await Order.create({
        user_id: req.body.user_id,
        cart_id: req.body.cart_id
    })

    res.status(201).json(order);
})

const updateOrder = asyncHandler(async (req, res) => {
    if(!req.params.orderId) {
        res.status(400)
        throw new Error("Please provide user id")
    }

    const order = await Order.findById(req.params.orderId)

    if(!order) {
        res.status(400)
        throw new Error("Order does not found")
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {new: true})

    res.status(200).json(updatedOrder)

})

const deleteOrder = asyncHandler(async (req, res) => {
    if(!req.params.orderId) {
        res.status(400)
        throw new Error("Please provide user id")
    }

    const order = await Order.findById(req.params.orderId)

    if(!order) {
        res.status(400)
        throw new Error("Order does not found")
    }

    await order.remove()

    res.status(200).json({ id: req.params.orderId})
})

module.exports = {
    getOrder, 
    setOrder,
    updateOrder,
    deleteOrder
}
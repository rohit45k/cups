const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    prod_id: {
        type: String,
    },
    qty: {
        type: Number,
    },
    subtotal: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    total: {
        type: Number,
    }
})

module.exports = mongoose.model("Cart", cartSchema)
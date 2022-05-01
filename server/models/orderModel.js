const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required:true
    },
    cart_id: {
        type: String,
        required:true
    },
    payment: {
        type: String,
        default: "pending",
        required:true
    },
    delivered: {
        type: Boolean,
        default: false,
        required:true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)
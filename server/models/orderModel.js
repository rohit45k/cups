const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    cart_id: {
        type: String
    },
    payemnt: {
        type: String
    },
}, {
    timestamp: true
})

module.exports = mongoose.model("Order", orderSchema)
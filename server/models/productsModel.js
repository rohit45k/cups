const mongoose = require("mongoose")

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    code: {
        type: String,
        required: [true, "Please add a product code"]
    },
    desc: {
        type: String,
        required: [true, "Please add product description"]
    },
    image: {
        type: String,
        required: [true, "Please add a image url"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price"]
    },
    pcs: {
        type: Number,
        required: [true, "Please enter number of cups in 1 packet"]
    },
    available: {
        type: Number,
        required: [true, "Please enter number packets available"]
    },
}) 

module.exports = mongoose.model("Products", productsSchema)
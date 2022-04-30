const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gst: {
        type: String,
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("User", userSchema)
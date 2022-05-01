const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")

const getUser = asyncHandler(async(req, res) => {
    if(!req.params.userId) {
        res.status(400)
        throw new Error("Please provide user id")
    }

    const user = await User.findById(req.params.userId)

    if(!user) {
        res.status(400)
        throw new Error("User do not exist")
    }

    res.status(200).json(user)
})

const setUser = asyncHandler(async(req, res) => {
    const { name, email, phone, gst, state, city, zipcode, street, landmark } = req.body

    if(!name || !email || !phone || !state || !city || !zipcode || !street || !landmark) {
        res.status(400)
        throw new Error("Please provide all required fields")
    }

    const user = await User.create({
        name: name,
        email: email,
        phone: phone,
        gst: gst ,
        state: state,
        city: city,
        zipcode: zipcode,
        street: street,
        landmark: landmark
    })

    res.status(201).json(user)
})

const updateUser = asyncHandler(async(req, res) => {
    if(!req.params.userId) {
        res.status(400)
        throw new Error("Please provide user id")
    }

    const user = await User.findById(req.params.userId)

    if(!user) {
        res.status(400)
        throw new Error("User do not exist")
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new : true})

    res.status(200).json(updatedUser)
})

const deleteUser = asyncHandler(async(req, res) => {
    if(!req.params.userId) {
        res.status(400)
        throw new Error("Please provide user id")
    }

    const user = await User.findById(req.params.userId)

    if(!user) {
        res.status(400)
        throw new Error("User do not exist")
    }

    await user.remove()

    res.status(200).json({id: req.params.userId})
})


module.exports = {
    getUser,
    setUser,
    updateUser,
    deleteUser
}
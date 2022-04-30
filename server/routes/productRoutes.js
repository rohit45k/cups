const express = require("express");
const { getAllProducts, getSingleProduct } = require("../controllers/productsController");
const router = express.Router()

// route to get all the product
router.get("/", getAllProducts)

// get single product with product id
router.get("/:id", getSingleProduct)

module.exports = router;
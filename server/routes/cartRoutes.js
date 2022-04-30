const express = require("express");
const { getCart, setCart, updateCart, deleteCart} = require("../controllers/cartController")

const router = express.Router()

router.get("/:cartId", getCart)

router.post("/", setCart)

router.put("/:cartId", updateCart)

router.delete("/:cartId", deleteCart)


module.exports = router
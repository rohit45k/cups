const express = require("express")
const { getOrder, setOrder, updateOrder, deleteOrder } = require("../controllers/orderController")

const router = express.Router()

router.get("/:orderId", getOrder)
router.post("/", setOrder)
router.put("/:orderId", updateOrder)
router.delete("/:orderId", deleteOrder)

module.exports = router


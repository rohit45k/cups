const express = require("express")
const { getPaymentStaus, makePayment } = require("../controllers/paymentController")

const router = express.Router()

router.get("/:orderId", getPaymentStaus)
router.post("/", makePayment)

module.exports = router
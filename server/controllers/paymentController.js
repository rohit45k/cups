const asyncHandler = require("express-async-handler")
const Paytm = require('paytm-pg-node-sdk');


const Order = require("../models/orderModel")
const User = require("../models/userModel")


// For Staging 
var environment = Paytm.LibraryConstants.STAGING_ENVIRONMENT;

// For Production 
// var environment = Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT;

// Find your mid, key, website in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
var mid = process.env.MERCHANT_ID;
var key = process.env.MERCHANT_KEY;
var website = process.env.WEBSITE;
var client_id = "WEB";

var callbackUrl = "http://localhost:3000/";
Paytm.MerchantProperties.setCallbackUrl(callbackUrl);

Paytm.MerchantProperties.initialize(environment, mid, key, client_id, website);
// If you want to add log file to your project, use below code
// Paytm.Config.logName = "[PAYTM]";
// Paytm.Config.logLevel = Paytm.LoggingUtil.LogLevel.INFO;
// Paytm.Config.logfile = "/path/log/file.log";


const getPaymentStaus = asyncHandler(async (req, res) => {
    if(!req.params.orderId) {
        res.status(400)
        throw new Error("Please provide order id")
    }

    const order = await Order.findById(req.params.orderId)

    if(!order) {
        res.status(400)
        throw new Error("Order does not found")
    }

    res.status(200).json(order)
})

const makePayment = asyncHandler(async (req, res) => {
    console.log(req.body);
    if(!req.body.user_id || !req.body.order_id) {
        res.status(400)
        throw new Error("Please provide user id and order id")
    }

    const user = await User.findById(req.body.user_id)

    var channelId = Paytm.EChannelId.WEB;
    var orderId = req.body.order_id;
    var txnAmount = Paytm.Money.constructWithCurrencyAndValue(Paytm.EnumCurrency.INR, "1.00");
    var userInfo = new Paytm.UserInfo(user._id); 
    userInfo.setAddress(`${user.street} ${user.city} ${user.state}`);
    userInfo.setEmail(user.email);
    userInfo.setFirstName(user.name);
    userInfo.setMobile(user.phone);
    userInfo.setPincode(user.zipcode);
    var paymentDetailBuilder = new Paytm.PaymentDetailBuilder(channelId, orderId, txnAmount, userInfo);
    var paymentDetail = paymentDetailBuilder.build();
    var response = Paytm.Payment.createTxnToken(paymentDetail);

    res.status(200).json(response)
})

module.exports = {
    getPaymentStaus,
    makePayment
}
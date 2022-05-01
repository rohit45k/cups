const express = require("express");
const cors = require("cors");
const req = require("express/lib/request");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware")
const dbConnection = require("./config/dbConnection")

dbConnection();

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.use("/api/products", require("./routes/productRoutes"))

app.use("/api/cart", require("./routes/cartRoutes"))

app.use("/api/user", require("./routes/userRoutes"))

app.use("/api/order", require("./routes/orderRoutes"))

app.use(errorHandler)

app.listen(port, (err) => {
    if(err) console.log("Error in Setting Server", err);
    else console.log(`Server is listening on port ${port}`);
})
const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)   
        console.log("Connection Successful");
    } catch (error) {
        console.log("Error in connection", error);
        process.exit(1)
    }
}

module.exports = dbConnection;

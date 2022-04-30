const express = require("express")
const { getUser, setUser, updateUser, deleteUser } = require("../controllers/userController")
const router = express.Router()

router.get("/:userId", getUser)

router.post("/", setUser)

router.put("/:userId", updateUser)

router.delete("/:userId", deleteUser)

module.exports = router
const express = require("express")
const { User } = require("../models")

const router = express.Router()
const usersControllers = require("../controllers/users.controllers")

router.get("/", usersControllers.getAllUsers)
router.get("/:id", usersControllers.getUserById)
router.post("/", usersControllers.createUser)
router.put("/:id", usersControllers.updateUser)
router.delete("/:id", usersControllers.deleteUser)

module.exports = router
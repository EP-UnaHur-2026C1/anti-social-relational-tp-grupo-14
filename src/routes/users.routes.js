const express = require("express")
const { User } = require("../models")

const router = express.Router()

router.get("/", async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)

    if (!user) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        })
    }

    res.json(user)
})

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error.message,
            details: error.errors
        })
    }
})

router.put("/:id", async (req, res) => {
    try {

        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            })
        }

        await user.update(req.body)

        res.json(user)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
})

router.delete("/:id", async (req, res) => {

    const user = await User.findByPk(req.params.id)

    if (!user) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        })
    }

    await user.destroy()

    res.json({
        message: "Usuario eliminado"
    })
})

module.exports = router
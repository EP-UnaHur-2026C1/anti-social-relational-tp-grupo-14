const express = require("express")
const { Comment, User, Post } = require("../models")

const router = express.Router()

router.get("/", async (req, res) => {
    const comments = await Comment.findAll({
        include: [User, Post]
    })
    res.json(comments)
})

router.get("/:id", async (req, res) => {
    const comment = await Comment.findByPk(req.params.id, {
        include: [User, Post]
    })
    if (!comment) {
        return res.status(404).json({
            error: "Comentario no encontrado"
        })
    }
    res.json(comment)
})

router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create(req.body)
        res.status(201).json(comment)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id)
        if (!comment) {
            return res.status(404).json({
                error: "Comentario no encontrado"
            })
        }
        await comment.update(req.body)
        res.json(comment)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    const comment = await Comment.findByPk(req.params.id)
    if (!comment) {
        return res.status(404).json({
            error: "Comentario no encontrado"
        })
    }
    await comment.destroy()
    res.json({
        message: "Comentario eliminado"
    })
})

module.exports = router
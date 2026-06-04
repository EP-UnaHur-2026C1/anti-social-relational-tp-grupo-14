const express = require("express")
const { Tag, Post } = require("../models")

const router = express.Router()

router.get("/", async (req, res) => {
    const tags = await Tag.findAll({
        include: [Post]
    })
    res.json(tags)
})

router.get("/:id", async (req, res) => {
    const tag = await Tag.findByPk(req.params.id, {
        include: [Post]
    })
    if (!tag) {
        return res.status(404).json({
            error: "Tag no encontrada"
        })
    }
    res.json(tag)
})

router.post("/", async (req, res) => {
    try {
        const tag = await Tag.create(req.body)
        res.status(201).json(tag)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id)
        if (!tag) {
            return res.status(404).json({
                error: "Tag no encontrada"
            })
        }
        await tag.update(req.body)
        res.json(tag)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    const tag = await Tag.findByPk(req.params.id)
    if (!tag) {
        return res.status(404).json({
            error: "Tag no encontrada"
        })
    }
    await tag.destroy()
    res.json({
        message: "Tag eliminada"
    })
})

module.exports = router
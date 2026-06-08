const {Tag} = require('../models');

const getAllTags = async (req, res) => {
    const tags = await Tag.findAll({
        include: [Post]
    })
    res.json(tags)
}

const getTagById = async (req, res) => {
    const tag = await Tag.findByPk(req.params.id, {
        include: [Post]
    })
    if (!tag) {
        return res.status(404).json({
            error: "Tag no encontrada"
        })
    }
    res.json(tag)
}

const createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body)
        res.status(201).json(tag)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updateTag =  async (req, res) => {
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
}


const deleteTag = async (req, res) => {
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
}

module.exports = {
    getAllTags,
    getTagById, 
    createTag,
    updateTag,
    deleteTag
}
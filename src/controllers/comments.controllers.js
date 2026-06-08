const { Comment, User, Post } = require("../models")    


const getAllComments = async (req, res) => {
    const comments = await Comment.findAll({
        include: [{ model: Post, attributes: ['description'] }]
    })
    res.json(comments)
}

const getCommentById = async (req, res) => {
    const comment = await Comment.findByPk(req.params.id, {
        include: [{model: Post, attributes: ['description'] }]
    })
    if (!comment) {
        return res.status(404).json({
            error: "Comentario no encontrado"
        })
    }
    res.json(comment)
}


const createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body)
        res.status(201).json(comment)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updateComment =  async (req, res) => {
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
}

const deleteComment = async (req, res) => {
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
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}   
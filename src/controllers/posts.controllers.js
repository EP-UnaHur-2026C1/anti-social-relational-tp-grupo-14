const { Op } = require("sequelize")
const { Post, User, Comment, Tag, PostImage } = require("../models")

const getAllPosts = async (req, res) => { // posts con el filtro de comentarios visibles

    const months = process.env.COMMENT_VISIBLE_MONTHS || 6

    const limitDate = new Date()
    limitDate.setMonth(limitDate.getMonth() - months)

    const posts = await Post.findAll({
        include: [{ model: Tag, attributes: ['name'] },
                  { model: PostImage, attributes: ['imageUrl'] },
                  { model: Comment, attributes: ['content'], where: { createdAt: { [Op.gte]: limitDate } }, required: false }
        ]})

    res.json(posts)
}

const getPostById = async (req, res) => {
    
    const months = process.env.COMMENT_VISIBLE_MONTHS || 6

    const limitDate = new Date()
    limitDate.setMonth(limitDate.getMonth() - months)
    
    const post = await Post.findByPk(req.params.id, {
         include: [{ model: Tag, attributes: ['name'] },
                  { model: PostImage, attributes: ['imageUrl'] },
                  { model: Comment, attributes: ['content'], where: { createdAt: { [Op.gte]: limitDate } }, required: false }
        ]
    })

    if (!post) {
        return res.status(404).json({
            error: "Post no encontrado"
        })
    }

    res.json(post)
}

const createPost = async (req, res) => {
    try {
        const { nickName, description } = req.body  
        const post = await Post.create({ nickName, description })

        res.status(201).json(post)
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {

    try {

        const post = await Post.findByPk(req.params.id)

        if (!post) {
            return res.status(404).json({
                error: "Post no encontrado"
            })
        }

        await post.update(req.body)

        res.json(post)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
}

const deletePost = async (req, res) => {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
        return res.status(404).json({
            error: "Post no encontrado"
        })
    }
    await post.destroy()
    res.json({
        message: "Post eliminado"
    })
}

const addImageToPost = async (req, res) => {    
    if (!req.file) { return res.status(400).json({ error: "No se recibió ninguna imagen" }) } //Controla undefined en caso de que multer no procese el archivo (ej: formato no permitido, tamaño excedido, etc)
    const post = await Post.findByPk(req.params.id)
    if (!post) {
        return res.status(404).json({ error: "Post no encontrado" })
    }
    const image = await PostImage.create({
        imageUrl: `/uploads/${req.file.filename}`,
        postId: req.params.id
    })
    res.status(201).json(image)
}

const addTagToPost = async (req, res) => {

    const post = await Post.findByPk(req.params.id)

    if (!post) {
        return res.status(404).json({
            error: "Post no encontrado"
        })
    }

    const tag = await Tag.findByPk(req.body.tagId)

    if (!tag) {
        return res.status(404).json({
            error: "Tag no encontrada"
        })
    }

    await post.addTag(tag)

    res.json({
        message: "Tag asociada al post"
    })
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    addImageToPost,
    addTagToPost
}   
const express = require("express")
const multer = require("multer")
const path = require("path")
const { Op } = require("sequelize")

const {
    Post,
    User,
    Comment,
    Tag,
    PostImage
} = require("../models")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads")
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router.get("/", async (req, res) => {

    const months = process.env.COMMENT_VISIBLE_MONTHS || 6

    const limitDate = new Date()
    limitDate.setMonth(limitDate.getMonth() - months)

    const posts = await Post.findAll({
        include: [
            User,
            Tag,
            PostImage,
            {
                model: Comment,
                where: {
                    createdAt: {
                        [Op.gte]: limitDate
                    }
                },
                required: false
            }
        ]
    })

    res.json(posts)
})

router.get("/:id", async (req, res) => {

    const post = await Post.findByPk(req.params.id, {
        include: [User, Comment, Tag, PostImage]
    })

    if (!post) {
        return res.status(404).json({
            error: "Post no encontrado"
        })
    }

    res.json(post)
})

router.post("/", async (req, res) => {

    try {

        const post = await Post.create(req.body)

        res.status(201).json(post)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })
    }
})

router.put("/:id", async (req, res) => {

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
})

router.delete("/:id", async (req, res) => {

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
})

router.post("/:id/images", upload.single("image"), async (req, res) => {

    const post = await Post.findByPk(req.params.id)

    if (!post) {
        return res.status(404).json({
            error: "Post no encontrado"
        })
    }

    const image = await PostImage.create({
        imageUrl: `/uploads/${req.file.filename}`,
        PostId: req.params.id
    })

    res.json(image)
})

router.post("/:id/tags", async (req, res) => {

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
})

module.exports = router
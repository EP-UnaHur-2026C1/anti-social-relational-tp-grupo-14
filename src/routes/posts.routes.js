const express = require("express")
const multer = require("multer")
const path = require("path")
const { Op } = require("sequelize")

const {Post, User, Comment,  Tag, PostImage} = require("../models")

const router = express.Router()

const postsControllers = require("../controllers/posts.controllers")
const upload = require("../middleware/upload")
const validatePost = require("../middleware/validatePost")

router.get("/", postsControllers.getAllPosts)

router.get("/:id", postsControllers.getPostById)

router.post("/", validatePost, postsControllers.createPost)

router.put("/:id", postsControllers.updatePost)

router.delete("/:id", postsControllers.deletePost)

router.post("/:id/images", upload.single("image"), postsControllers.addImageToPost)

router.post("/:id/tags", postsControllers.addTagToPost)

module.exports = router
const express = require("express")
const { Tag } = require("../models")

const router = express.Router()
const tagsControllers = require("../controllers/tags.controllers")

router.get("/", tagsControllers.getAllTags) 
router.get("/:id", tagsControllers.getTagById) 
router.post("/", tagsControllers.createTag) 
router.put("/:id", tagsControllers.updateTag)
router.delete("/:id", tagsControllers.deleteTag)

module.exports = router
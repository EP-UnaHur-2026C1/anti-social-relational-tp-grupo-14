const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, "src/uploads")},
    filename: (req, file, cb) => {cb(null, Date.now() + path.extname(file.originalname))}
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
        cb(null, true)
    } else {
        cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, gif, webp)"), false)
    }
}


const upload = multer({storage, limits: { fileSize: 5242880 }, fileFilter }) //Limite de 5MB por imagen



module.exports = upload
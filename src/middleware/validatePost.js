// middleware/validatePost.js
const { User } = require("../models")

const validatePost = async (req, res, next) => {
    const { nickName, description } = req.body

    if (!nickName) { return res.status(400).json({ error: "El nickName del usuario es requerido"})}
    if (!description) { return res.status(400).json({ error: "La descripción del post es requerida"  }) }

    // Validar que el usuario existe
    const userExists = await User.findByPk(nickName)
    if (!userExists) { return res.status(404).json({ error: `El usuario ${nickName} no existe` }) }
    next()
}

module.exports = validatePost
const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Post = sequelize.define("Post", {
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Post
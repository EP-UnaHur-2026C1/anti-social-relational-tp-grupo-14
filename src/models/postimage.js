const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const PostImage = sequelize.define("PostImage", {
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = PostImage
const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickName: {                   
        type: DataTypes.STRING,
        allowNull: false
    },   
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Post
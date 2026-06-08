const sequelize = require("../config/database")

const User = require("./user")
const Post = require("./post")
const Comment = require("./comment")
const Tag = require("./tag")
const PostImage = require("./postimage")

User.hasMany(Post, { foreignKey: 'nickName' })
Post.belongsTo(User , { foreignKey: 'nickName' })

User.hasMany(Comment, { foreignKey: 'nickName' })
Comment.belongsTo(User, { foreignKey: 'nickName' })

Post.hasMany(Comment, { foreignKey: 'postId' })
Comment.belongsTo(Post, { foreignKey: 'postId' })

Post.hasMany(PostImage, { foreignKey: 'postId' })
PostImage.belongsTo(Post, { foreignKey: 'postId' })

Post.belongsToMany(Tag, { through: "PostTags" })
Tag.belongsToMany(Post, { through: "PostTags" })

module.exports = {
    sequelize,
    User,
    Post,
    Comment,
    Tag,
    PostImage
}
/* esto es de followers 
User.belongsToMany(User, {
    through: "Followers",
    as: "following",
    foreignKey: "followerId",
    otherKey: "followingId"
})

User.belongsToMany(User, {
    through: "Followers",
    as: "followers",
    foreignKey: "followingId",
    otherKey: "followerId"
}) */
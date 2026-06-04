const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")

const { sequelize } = require("./models")

const usersRoutes = require("./routes/users.routes")
const postsRoutes = require("./routes/posts.routes")
const commentsRoutes = require("./routes/comments.routes")
const tagsRoutes = require("./routes/tags.routes")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("src/uploads"))

const swaggerDocument = YAML.load("./src/swagger/swagger.yaml")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (req, res) => {
    res.send("Servidor funcionando")
})

app.use("/users", usersRoutes)
app.use("/posts", postsRoutes)
app.use("/comments", commentsRoutes)
app.use("/tags", tagsRoutes)

sequelize.sync({ alter: true })

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.send("Servidor funcionando")
})

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})
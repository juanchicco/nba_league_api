require("dotenv").config()
require("./data/config")
const express = require("express")
const app = express()
const PORT = process.env.PORT|| 5000
const path = require("path")
const hbs = require("express-handlebars")
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))
app.use(cors())

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")) // "./views"
app.engine("hbs", hbs.engine({ extname: "hbs" }))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get("/",(req,res) => {
    const content = `<h1>Welcome to API of NBA</h1>`
    res.send(content)
})

app.use("/users",require("./users/userRouter"))
app.use("/teams", require("./teams/teamRouter"))
app.use("/players", require("./players/playerRouter"))

app.use((req,res,next)=> {
    let error = new Error()
    error.status = 404
    error.message = "Resource not found"
    next(error)
})

app.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
        error.message = "Internal Error Server"    
    }
    res.status(error.status).json({ status: error.status, message: error.message })
})

app.listen(PORT,(err)=> {
    err ? console.log("Error...",err) : console.log(`App corriendo en http://localhost:${PORT}`)
})
const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")

const errorMiddleware = require("./middleware/errorMiddleware.js")

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true
}))

//static files access
app.use(express.static(path.join(__dirname , "./client/build")))

//import routing
const courseRouter = require("./routes/courseRouter.js")

app.use("/api/v1" , courseRouter)

app.get("*" , (req , res )=>{
    res.sendFile(path.join(__dirname , "./client/build/index.html"))
})

//use errorMiddleware globally
app.use(errorMiddleware)


module.exports = app
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connection = require("./middleware/connection")
const cloudinary =  require("cloudinary")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")

const errorMiddleware = require("./middleware/errorMiddleware.js")

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true
}))

//Set environment Configration
dotenv.config({path : "./.env"})

//static files access
app.use(express.static(path.join(__dirname , "./build")))

//import routing
const courseRouter = require("./routes/courseRouter.js")

app.use("/api/v1" , courseRouter)

app.get("*" , (req , res )=>{
    res.sendFile(path.join(__dirname , "./build/index.html"))
})

//use errorMiddleware globally
app.use(errorMiddleware)

//handling UncaughtException Error
process.on("uncaughtException" , (err)=>{
    console.log(`Error is ${err}`)
    console.log(`Shutting Down due to uncaughtException Error`)

    process.exit(1)
})


//Made connection with mongoDB
connection()

//Cloudanary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.port || 4000 , ()=>{
    console.log(`Listening on port ${process.env.port || 4000}`)
})

//handling unhandled Promised Rejection Error
process.on("unhandledRejection" , (err)=>{
    console.log(`Error is ${err}`)
    console.log(`Shutting Down due to uncaughtException Error`)

    server.close(()=>{
        process.exit(1)
    })
})



module.exports = app
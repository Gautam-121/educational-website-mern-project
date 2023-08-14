const app = require("./app")
const dotenv = require("dotenv")
const connection = require("./middleware/connection")
const cloudinary =  require("cloudinary")
const express = require("express")
const path = require("path")

//handling UncaughtException Error
process.on("uncaughtException" , (err)=>{
    console.log(`Error is ${err}`)
    console.log(`Shutting Down due to uncaughtException Error`)

    process.exit(1)
})

//Set environment Configration
dotenv.config({path : "./.env"})

//static files access
app.use(express.static(path.join(__dirname , "./client/build")))


//Made connection with mongoDB
connection()

//Cloudanary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



app.get("*" , (req , res )=>{
    res.sendFile(path.join(__dirname , "./client/build/index.html"))
})


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
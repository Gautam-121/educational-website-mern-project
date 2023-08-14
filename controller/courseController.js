const Course = require("../model/courseModel.js")
const ErrorHandler = require("../utils/errorHandler.js")
const cloudinary = require("cloudinary")
const Istructor = require("../model/istructorModel.js")
const OnlineCourse = require("../model/onlineCoursesModel.js")


//Istructor Registration Controller
const registerIstructor = async (req , res , next)=>{

    try{

    const {name} = req.body

    const file = req.files?.photo

    if(file === "undefined"){
        return next(new ErrorHandler("Please Provide profile img"))
    }

    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath , {
        folder : "profile",
        width : 150,
        crop : "scale"
     })
    
     const istructor = await Istructor.create({
        name,
        cover:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
     })

     res.status(201).json({
        success : true,
        message : 'Registerd Successufully',
        istructor
     })

    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
    
}

//Courses Registration Controller
const registeredCourse = async (req , res , next)=>{

    try{

     const {coursesName  , instructor  , priceAll , pricePerMonth , noOfLectures , noOfHours} = req.body

    const file = req.files?.photo

        if(typeof file == "undefined"){
            return next(new ErrorHandler("Please Provide bookCover" , 400))
        }

        const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "courses",
            width: 150,
            crop: "scale",
        })

        const course = await Course.create({
            coursesName  , 
            instructor , 
            priceAll , 
            pricePerMonth , 
            noOfLectures ,
            noOfHours,
            cover : {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        })

        return res.status(201).json(
            {
                status: true,
                msg: "Book detail is successfully registered",
                course
            })

    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
}

//OnlineCourses Registration Controller
const registerdOnlineCourse = async (req , res , next)=>{
    
    try{

        const {courseName , course} = req.body

        const file = req?.files?.photo

        if(typeof file == "undefined"){
            return next(new ErrorHandler("Please Provide bookCover" , 400))
        }

        const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: "onlineCouseCover",
            width: 150,
            crop: "scale",
        })

        const onlineCourse = await OnlineCourse.create({
            courseName , 
            cover: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            course
        })

        return res.status(201).json(
            {
                status: true,
                msg: "Book detail is successfully registered",
                onlineCourse
            })

    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
}

//Access Courses
const getCourses =  async (req , res , next)=>{

    try{
        const courses = await Course.find().populate("instructor")
        res.status(200).json({
        success : true,
        courses
       })
    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
}

//get Online Courses
const getOnlineCourses = async (req , res , next)=>{

    try{

        const onlineCourses = await OnlineCourse.find()
        res.status(200).json({
            success : true,
            onlineCourses
        })

    }catch(err){
        return next(new ErrorHandler(err , 500))
    }
}





module.exports = {registeredCourse , registerIstructor , registerdOnlineCourse , getCourses , getOnlineCourses}
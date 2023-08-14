const mongoose = require("mongoose")

//course Create Schema with mongoose
const courseSchema = new mongoose.Schema({

    coursesName : {
        type : String,
        required : [true , "CourseName should not be empty"],
        trim : true
    },
    cover: { 

        public_id : {
            type:String,
            required:true
        },
        url: {
            type:String,
            required:true
        }
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "istructor",
        required : true
    },
    priceAll: {
        type : String,
        required : [true , "PriceAll should not be empty"]
    },
    pricePerMonth: {
        type : String,
        required : [true , "PricePer should not be empty"]
    },
    noOfLectures : {
        type:Number,
        required:[true , "noOfLectures should not be empty"]
    },
    noOfHours:{
        type:Number,
        required:[true , "noOfHours should not be empty"]
    },
    createdAt : {
        type :Date,
        default : Date.now()
    }
})

//create mongoDB Collection as name course
module.exports = mongoose.model("course" , courseSchema)
const mongoose = require("mongoose")

const onlineCoursesSchema = new mongoose.Schema({

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
    courseName : {
        type : String,
        required:[true , "courseName Should not be empty"]
    },
    course : {
        type :Number,
        required : [true , "couses Should not be empty"]
    },
    createdAt : {
        type :Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("onlineCouse" , onlineCoursesSchema)


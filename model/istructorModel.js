const mongoose = require("mongoose");

//Instructor Create Schema with mongoose
const istructorSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : [true , "InstructorName should Not be Empty"]
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
    createdAt : {
        type :Date,
        default : Date.now()
    }
})

//create mongoDB  Collection as name istructor
module.exports = mongoose.model("istructor" , istructorSchema)
const mongoose = require("mongoose")

//Coonection with mongoDb
const connection = ()=>{

    mongoose.connect( process.env.DB_URL, {
        useNewUrlParser : true
    })
    .then((data)=>console.log(`mongoDB connected on ${data.connection.host}`))
    .catch((err)=>console.log(err))
}

module.exports = connection
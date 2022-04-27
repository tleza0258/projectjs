const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userID: String,
    password: String,
    name:String,
    address:String,
    mail:String,
  })


//ส่งออกโมเดล
module.exports = mongoose.model("User",userSchema)
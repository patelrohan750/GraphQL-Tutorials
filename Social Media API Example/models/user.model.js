const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    createdAt:String
})
const User=new mongoose.model('users',UserSchema)
module.exports=User;
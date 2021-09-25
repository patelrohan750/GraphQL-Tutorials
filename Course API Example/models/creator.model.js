const mongoose=require('mongoose')
const CreatorSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    experience:{
        type:Number,
        required: true
    },
    createdCourses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'course'
        }
    ],
   
})
const Creator=new mongoose.model('Creator',CreatorSchema)
module.exports=Creator
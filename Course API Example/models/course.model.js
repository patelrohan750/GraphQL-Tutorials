const mongoose=require('mongoose')
const CourseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    language:{
        type:String,
        required: true
    },
    stack:{
        type:String,
        required: true
    },
    createdAt:{
        type:String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    },
    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
   
})
const Course=new mongoose.model('course',CourseSchema)
module.exports=Course
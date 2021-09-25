const CourseResolver=require('./course')
const StudentResolver=require('./student')
const CreatorResolver=require('./creator')
const Course=require('../../models/course.model')
module.exports={
    Course:{
        anrollStudentsCount:async(parent)=>{
            console.log("parent: ",parent)
            const course=await Course.findById(parent._id)
            return course.students.length;
        }
    },
    Query:{
        ...CourseResolver.Query,
        ...StudentResolver.Query,
        ...CreatorResolver.Query
    },
    Mutation:{
        ...CourseResolver.Mutation,
        ...StudentResolver.Mutation,
        ...CreatorResolver.Mutation
    }
}
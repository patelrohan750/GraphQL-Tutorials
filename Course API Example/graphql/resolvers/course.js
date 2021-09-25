const Course = require('../../models/course.model')
const Creator=require('../../models/creator.model')
const moment=require('moment')
const {DynamicCreator,DynamicStudents}=require('./service')
const checkAuth=require('../../utils/auth')
module.exports = {
    Query: {
        hello: () => {
            return "Hii buddy"
        },
        getCourses: async () => {
            try {
                const courses= await Course.find()
                if(courses.length===0){
                    throw new Error("No courses")
                }
                return courses.map((course)=>{
                  return{
                    ...course._doc,
                    creator:DynamicCreator.bind(this,course._doc.creator),
                    students:DynamicStudents.bind(this,course._doc.students)
                  }
                })
            } catch (err) {
                throw new Error(err)
            }

        },
        getCourse:async(_,{courseId})=>{
            try{
                const course=await Course.findById(courseId)
                if(!course){
                    throw new Error("course Not Found")
                }
                return course
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation:{
        createCourse:async(_,args,context)=>{
            // console.log("ARGS: ",args)
            const creator=checkAuth(context,"creator")
            console.log("creator",creator)
            const {courseName,category,price,language,stack}=args.courseInput
            try{
                const course=new Course({
                    courseName,category,price,language,stack,
                    createdAt:moment().format('MMM D YYYY hh:mm:ss A'),
                    creator:creator._id,
                   
                })
                await course.save()
                const findCreator=await Creator.findOne({_id:creator._id})
                findCreator.createdCourses.push(course._id)
                await findCreator.save()
                return {
                    ...course._doc,
                    creator:DynamicCreator.bind(this,course.creator)
                };
            }catch(err){
                throw new Error(err)
            }
        }
    }
}
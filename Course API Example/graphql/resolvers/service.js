const Creator=require('../../models/creator.model')
const Course=require('../../models/course.model')
const Student=require('../../models/student.model')
const DynamicCreator=async(creatorId)=>{
    console.log("dynamic creator call")
    try{
        const creator=await Creator.findById(creatorId)
        console.log(creator)
        return {
            ...creator._doc,
            createdCourses:DynamicCourses.bind(this,creator._doc.createdCourses)

        }
    }catch(err){
        throw new Error(err)
    }
}
const DynamicCourses=async(courseIds)=>{
    console.log("dynamic courses call")
    try{
        const courses=await Course.find({_id:{$in:courseIds}})
        return courses.map((course)=>{
            console.log(course)
            return{
                ...course._doc,
                creator:DynamicCreator.bind(this,course.creator),
                students:DynamicStudents.bind(this,course._doc.students)
            }
        })
    }catch(err){
        throw new Error(err)
    }
}
const DynamicStudents=async(studentIds)=>{
    console.log("dynamic student call")
    try{
        const students=await Student.find({_id:{$in:studentIds}})
        return students.map((student)=>{
            console.log(student)
            return{
                name:student.name,
                email:student.email
            }
        })
    }catch(err){
        throw new Error(err)
    }
}
module.exports={
    DynamicCreator,
    DynamicCourses,
    DynamicStudents
}
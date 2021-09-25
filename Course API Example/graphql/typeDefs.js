const {gql}=require('apollo-server-express')

const typeDefs=gql`
    type Creator{
        _id:ID!
        name:String!
        email:String!
        password:String!
        experience:Int!
        token:String
        createdCourses:[Course!]
    }
    type Student{
        _id:ID
        name:String
        email:String!
        password:String
        token:String
        anrollcourses:[Course]
    }
    type Course{
        _id:ID!
        courseName:String!  
        category:String  
        price:Float!        
        language:String!     
        stack:Stack!       
        createdAt:String!
        creator:Creator!
        students:[basicStudentInfo!]
        anrollStudentsCount:Int!
    }
    type basicStudentInfo{
        name:String!
        email:String!
    }
   
    enum Stack{
        WEB
        MOBILE
        MERN
        MEAN
        MEVN
        OTHER
    }
    
    input CourseInput{
        courseName:String!
        category:String!
        price:Float!
        language:String!
        stack:Stack!
       
    }
    input CreatorInput{
        name:String!
        email:String!
        password:String!
        experience:Int!
    }
    input StudentInput{
        name:String!
        email:String!
        password:String!
    }
    type Query{
        hello:String
        getCourse(courseId:ID):Course!
        getCourses:[Course]
    }
    type Mutation{
        createCreator(creatorInput:CreatorInput):Creator!
        createStudent(studentInput:StudentInput):Student!
        createCourse(courseInput:CourseInput):Course!
        loginStudent(email:String!,password:String!):Student!
        loginCreator(email:String!,password:String!):Creator!
        anrollCourse(courseId:ID):Student!

    }
`
module.exports=typeDefs


const UserResolver=require('./users')
const PostResolver=require('./post')
const CommentsResolver=require('./comments')

module.exports={
    Post:{
        commentsCount:(parent)=>{
            console.log("parent: ",parent)
            return parent.comments.length
        },
        likesCount:(parent)=>parent.likes.length
    },
    Query:{
        ...PostResolver.Qurey
    },
    Mutation:{
        ...UserResolver.Mutation,
        ...PostResolver.Mutation,
        ...CommentsResolver.Mutation
    }

}

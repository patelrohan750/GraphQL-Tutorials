const Post=require('../../models/post.model')
const checkAuth =require('../../utils/auth')
const {UserInputError,AuthenticationError}=require('apollo-server-express')
const moment=require('moment')

module.exports={
    Mutation:{
        makeComment:async(_,{postId,text},context)=>{
            const user=checkAuth(context)
            if(text.trim()===''){
                throw new UserInputError("Empty Comment",{
                    errors:{
                        text:"comment text must not be empty"
                    }
                })
            }

            const post=await Post.findById(postId)
            if(post){
                post.comments.unshift({
                    text,
                    username:user.username,
                    createdAt:moment().format('MMM D YYYY hh:mm:ss A')
                })
                await post.save()
                return post
            }else {
                throw new Error("Post Not Found")
            }

        },
        deleteComment:async(_,{postId,commentId},context)=>{
            const user=checkAuth(context)
            
            const post = await Post.findById(postId);
            console.log(post)
            if(post){
                const commentIndex=post.comments.findIndex(c=>c.id===commentId)
                if(commentIndex===-1){
                    throw new Error('Comment not found');
                }
                if(post.comments[commentIndex].username===user.username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError('Action not allowed You must be logged in');
                }
            }
            else {
                throw new Error('Post not found');
              }
        }
    }
}
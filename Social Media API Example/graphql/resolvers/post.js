const Post=require('../../models/post.model')
const checkAuth =require('../../utils/auth')
const moment=require('moment')
const {AuthenticationError} =require('apollo-server-express')

module.exports={
    Qurey:{
        getPosts:async()=>{
            try{
                const posts=await Post.find().sort({createdAt:-1})
                return posts
            }
            catch (err) {
                throw new Error(err);
            }
        },
        getPost:async(_,{postId})=>{
            try{
                const post=await Post.findById(postId)
                if(!post){
                    throw new Error('Post not found');
                }
                return post;

            }catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation:{
        createPost:async(_,{body},context)=>{
            const user=checkAuth(context)
            console.log("USER: ",user)

            const newPost=new Post({
            body,
            user:user._id,
            username:user.username,
            createdAt:moment().format('MMM D YYYY hh:mm:ss A')
        })
        const post =await newPost.save()
        return post
        },

        deletePost:async(_,{postId},context)=>{
            const user=checkAuth(context)
            try{
                const post=await Post.findById(postId);
                if(user.username===post.username){
                    await post.delete()
                    return `${postId} post Deleted successfully 👍`
                }else{
                    throw new AuthenticationError("Action not allowed you must be logged in")
                }
            }
            catch(err){
                throw new Error(err)
            }
           
        },
        likePost:async(_,{postId},context)=>{
            const user=checkAuth(context)
            try{
                const post=await Post.findById(postId);
                if(post){
                    if(post.likes.find(like=>like.username===user.username)){
                        //post already like ,unlike it
                        post.likes=post.likes.filter(like=>like.username!==user.username)
                       


                    }else{
                        //like it
                        post.likes.push({
                            username:user.username,
                            createdAt:moment().format('MMM D YYYY hh:mm:ss A')
                        })
                       
                    }
                    await post.save()
                    return post
                }
                else{
                    throw new Error("post Not Found")
                }
            }
            catch(err){
                throw new Error(err)
            }
        }
      
    
        
    }
}
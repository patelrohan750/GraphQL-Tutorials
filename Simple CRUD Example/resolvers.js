const Post=require('./models/Post.model')

const resolvers  = {
    Query: {
        hello: () => {
            return "Hello world"
        },
        getAllPosts:async()=>{
            const posts=await Post.find()
            return posts
        },
        getPost:async(parent,args,context,info)=>{
            const post=await Post.findById(args.id);
            return post
        }
        
    },
    Mutation:{
        createPost:async(parent,args,context,info)=>{
            // console.log('parent: ',parent)
            // console.log('args: ',args)
            // console.log('context: ',context)
            // console.log('info: ',info)
            const {title,description}=args.post
            const post=new Post({title,description})
            await post.save()
            return post;
        },
        updatePost:async(parent,args,context,info)=>{
            const {id}=args
            const {title,description}=args.post
            const post =await Post.findByIdAndUpdate(id,{title,description},{new:true})
            return post
        },
        deletePost:async(parent,args,context,info)=>{
            const {id}=args
            await Post.findByIdAndRemove(id)
            return `ok 👍 ${id} deleted successfully`
        }
    }
};

module.exports=resolvers
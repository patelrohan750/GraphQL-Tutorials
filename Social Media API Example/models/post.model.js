const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      text: String,
      username: String,
      createdAt: String,
    },
  ],
  likes:[
      {
        username: String,
        createdAt: String,
      }
  ],
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
  }
});

const Post=new mongoose.model('posts',PostSchema);
module.exports=Post
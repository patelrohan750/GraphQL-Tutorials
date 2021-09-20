const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    commentsCount:Int!
    likesCount:Int!
  }
  type Comment {
    id: ID
    text: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    createPost(body: String!): Post
    deletePost(postId: ID!): String
    makeComment(postId:ID!,text:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
  }
`;
module.exports = typeDefs;

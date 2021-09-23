const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Booking{
    _id:ID
    event:Event!
    user:User!
    createdAt:String!
  }
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator:User!
  }
  type User{
      _id:ID!
      email:String!
      password:String!
      token:String
      createdEvents:[Event!]
  }
  input EventInput{
    title: String!
    description: String!
    price: Float!
  }
  input UserInput{
    email:String!
    password:String!
  }
  type Query{
      events:[Event!]!
      bookings:[Booking!]!
  }
  type Mutation{
      createEvent(eventInput:EventInput):Event
      createUser(userInput:UserInput):User
      login(email: String!, password: String!): User
      bookEvent(eventId:ID!):Booking
      cancelBooking(bookingId:ID!):String
  }
`;
module.exports = typeDefs;

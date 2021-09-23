const EventResolvers=require('./event')
const UserResolver=require('./user')
const BookingResolver=require('./booking')
module.exports={
    Query:{
        ...EventResolvers.Query,
        ...BookingResolver.Query
    },
    Mutation:{
        ...EventResolvers.Mutation,
        ...UserResolver.Mutation,
        ...BookingResolver.Mutation
    }
}
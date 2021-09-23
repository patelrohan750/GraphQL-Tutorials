const Booking=require('../../models/booking.model')
const checkAuth=require('../../utils/auth')
const moment=require('moment')
const {creatorUser,singleEvent} =require('./service')
module.exports={
    Query:{
        bookings:async()=>{
            try{
                const bookings=await Booking.find()
                return bookings.map(booking=>{
                    return{
                        ...booking._doc,
                        user:creatorUser.bind(this,booking._doc.user),
                        event:singleEvent.bind(this,booking._doc.event)
                    }
                })

            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation:{
        bookEvent:async(_,{eventId},context)=>{
            const authUser=checkAuth(context)
            const booking=new Booking({
                event:eventId,
                user:authUser._id,
                createdAt:moment().format('MMM D YYYY hh:mm:ss A'),
            })
            const result=await booking.save()
            return{
                ...result._doc,
                user:creatorUser.bind(this,result._doc.user),
                event:singleEvent.bind(this,result._doc.event)
            }
        },
        cancelBooking:async(_,{bookingId},context)=>{
            const authUser=checkAuth(context)
            await Booking.deleteOne({_id:bookingId})
            return "Your Booking is Canceld"
        }
    }
}
const mongoose=require('mongoose')

const BookingSchema=new mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type: String,
        required: true
    }
})

const Booking=new mongoose.model('Booking',BookingSchema)
module.exports=Booking
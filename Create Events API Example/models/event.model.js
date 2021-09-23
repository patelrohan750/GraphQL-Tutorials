const mongoose=require('mongoose')
const EventSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Event=new mongoose.model('Event',EventSchema)
module.exports=Event
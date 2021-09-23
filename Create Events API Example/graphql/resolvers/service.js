const Event=require('../../models/event.model')
const User=require('../../models/user.model')

const createdEventsUser=async(eventIds)=>{
    console.log("CreatedEventsUser Call...");
    // console.log("IDS:",...eventsIds);
    // console.log(eventsIds);
    try{
        const events = await Event.find({ _id: { $in: eventIds } });
        //   console.log("Events: ",events)
        return events.map(event=>{
            return{
                ...event._doc,
                creator:creatorUser.bind(this,event.creator)
            }
        })
    }catch(err){
        throw new Error(err)
    }
}
const creatorUser=async(userId)=>{
    console.log("creatorUser Call...");
  
    try{
        const user=await User.findById(userId)
        return {
            ...user._doc,
            createdEvents:createdEventsUser.bind(this, user._doc.createdEvents)
        }
    }catch(err){
        throw new Error(err)
    }
}
const singleEvent=async(eventId)=>{
    try{
        const event=await Event.findById(eventId)
        return{
            ...event._doc,
            creator:creatorUser.bind(this,event.creator)
        }

    }catch(err){
        throw new Error(err)
    }
}
module.exports={
    creatorUser,
    singleEvent
};
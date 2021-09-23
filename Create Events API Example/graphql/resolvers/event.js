const Event=require('../../models/event.model')
const User=require('../../models/user.model')
const moment=require('moment')
const checkAuth=require('../../utils/auth')
const {creatorUser} =require('./service')


module.exports={
    Query:{
        events:async()=>{
            const events=await Event.find()
           return events.map(event=>{
                return{
                    ...event._doc,
                    creator:creatorUser.bind(this,event._doc.creator)
                }
                   
                
            })
        // return events
            
           
        }
    },
    Mutation:{
        createEvent:async(_,args,context)=>{
            const user=checkAuth(context)
            const {title,description,price}=args.eventInput;
            
            try{
                const event=new Event({
                    title,description,price,
                    date:moment().format('MMM D YYYY hh:mm:ss A'),
                    creator:user._id
                    
                })
                const findUser=await User.findOne({_id:user._id})
                findUser.createdEvents.push(event._id)
                await findUser.save()

               const createdEvent=await event.save()
                return {
                    ...createdEvent._doc,
                    creator:creatorUser.bind(this,createdEvent._doc.creator)
                }
            }catch(err){
                throw new Error(err)
            }
        }
    }
}


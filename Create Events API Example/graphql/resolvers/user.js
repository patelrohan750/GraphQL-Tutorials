const User=require('../../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
module.exports={
    Mutation:{
        createUser:async(_,args)=>{
            const {email,password}=args.userInput
            const user=await User.findOne({email})
            if(user){
                throw new Error("User Alreay Exists")
            }
            const hashPassword=await bcrypt.hash(password,12)
            const newUser=new User({
                email,
                password:hashPassword
            })
            return await newUser.save()
        },
        login:async(_,{email,password})=>{
            const user=await User.findOne({email})
            if(!user){
                throw new Error("Invalid Details")
            }
            const match=await bcrypt.compare(password,user.password)
            if(!match){
                throw new Error("Invalid Details")
            }
            const token=jwt.sign({
                _id:user._id,
                email:user.email
            },process.env.JWT_SECRECT_KEY,{expiresIn:'1h'}) 
            return {
                ...user._doc,
                token
            }
        }

    }
}
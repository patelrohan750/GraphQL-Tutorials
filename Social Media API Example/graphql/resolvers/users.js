const User=require('../../models/user.model');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const moment=require('moment')
const {UserInputError}=require('apollo-server-express')
const {validateRegisterInputs,validateLoginInputs}=require('../../utils/validation')
const generateTokens=(user)=>{
    return jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email
    },process.env.JWT_SECRECT_KEY,{expiresIn:'1h'}) 
}
module.exports={
    Mutation:{
        register:async(parent,args,context,info)=>{
            // console.log(args)
            const {username,email,password,confirmPassword}=args.registerInput
            //TODO: validation
            const {valid,errors}=validateRegisterInputs(username,email,password,confirmPassword)
            if(!valid){
                throw new UserInputError('Errors',{errors})
            }

            //TODO:check if username exists or not
            const user=await User.findOne({username})
            if(user){
                throw new UserInputError('username is taken',{
                    errors:{
                        username:"this username is taken"
                    }
                   
                })
            }

            //TODO: hash the password
            const hashPassword=await bcrypt.hash(password,12)
          
            //TODO: save the user in DB
            const newUser=new User({
                username,email,
                password:hashPassword,
                createdAt:moment().format('MMM D YYYY hh:mm:ss A')
            })
            
            const res=await newUser.save()
            console.log({...res._doc})

            //TODO: generate token 
            const token=generateTokens(res)
            return{
                ...res._doc,
                id:res._id,
                token
            }
        },

        login:async(_,{username,password})=>{
            const {valid,errors}=validateLoginInputs(username,password)
            if(!valid){
                throw new UserInputError('Errors',{errors})
            }
          
            const user=await User.findOne({username})
          
            if(!user){
                errors.general="User Not Found"
                throw new UserInputError('User Not Found',{errors})
            }
            const match=await bcrypt.compare(password,user.password)
            if (!match) {
                errors.general = 'Invalid details';
                throw new UserInputError('Invalid details', { errors });
            }
            const token=generateTokens(user)
            return{
                ...user._doc,
                id:user._id,
                token
            }
            
        }
    }
}
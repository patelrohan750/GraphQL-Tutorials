const jwt=require('jsonwebtoken')
const {AuthenticationError} =require('apollo-server-express')

module.exports=(context)=>{
    const authHeader=context.req.headers.authorization
    if(authHeader){
        const token=authHeader.split('Bearer ')[1]
        if(token){
            try{
                const user=jwt.verify(token,process.env.JWT_SECRECT_KEY)
                return user
            }catch(err){
                throw new AuthenticationError("Invalid/Expired Token")
            }
        }
        throw new Error("Authentication token must  provide like Bearer token")
    }
    throw new Error("Authorization header must  provide")
}
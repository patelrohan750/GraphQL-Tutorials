const jwt=require('jsonwebtoken')
const {AuthenticationError} =require('apollo-server-express')
module.exports=(context)=>{
    // console.log("CONTEXT: ",context)
    const authHeader=context.req.headers.authorization
    console.log("authHeader: ",authHeader)
    if(authHeader){
        //Bearer token...
        const token=authHeader.split('Bearer ')[1];
        console.log("TOKEN: ",token)
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
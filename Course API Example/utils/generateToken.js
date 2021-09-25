const jwt=require('jsonwebtoken')

module.exports.generateToken=async(user,role)=>{
    if(role.toLowerCase()==="student"){
        console.log("student token generate...")
        return jwt.sign({
            _id:user._id,
            email:user.email,
        },process.env.JWT_SECRECT_KEY_STUDENT,{expiresIn:'9h'})
    }else{
        console.log("creator token generate...")
        return jwt.sign({
            _id:user._id,
            email:user.email,
        },process.env.JWT_SECRECT_KEY_CREATOR,{expiresIn:'9h'})
    }
   
}
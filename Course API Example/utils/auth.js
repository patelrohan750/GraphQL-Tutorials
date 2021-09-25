const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

module.exports = (context,role) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        if(role.toLowerCase()=='student'){
          console.log("Student Token",token)
            const student = jwt.verify(token, process.env.JWT_SECRECT_KEY_STUDENT);
            return student;
        }else{
          console.log("Creator Token",token)
            const creator = jwt.verify(token, process.env.JWT_SECRECT_KEY_CREATOR);
            return creator;
        }
       
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    throw new Error("Authentication token must  provide like Bearer token");
  }
  throw new Error("Authorization header must  provide");
};

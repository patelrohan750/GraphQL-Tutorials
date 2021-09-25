const Creator = require("../../models/creator.model");
const bcrypt = require("bcryptjs");
const {generateToken}=require('../../utils/generateToken')
module.exports = {
  Query: {},
  Mutation: {
    createCreator: async (_, args) => {
      const { email, password, name, experience } = args.creatorInput;
      const creator = await Creator.findOne({ email });
      if (creator) {
        throw new Error("creator Already Exists");
      }
      try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newCreator = new Creator({
          email,
          password: hashPassword,
          name,
          experience,
        });
        await newCreator.save();
        return newCreator;
      } catch (err) {
        throw new Error(err);
      }
    },
    loginCreator:async(_,{email,password})=>{
         const creator = await Creator.findOne({email});
           if (!creator) {
            throw new Error("Invalid Details");
        }
          const match=await bcrypt.compare(password,creator.password)
           if(!match){
            throw new Error("Invalid Details");
        }
        const token=generateToken(creator,"CREATOR")
        return{
            ...creator._doc,
            token
        }
    }
  },
};

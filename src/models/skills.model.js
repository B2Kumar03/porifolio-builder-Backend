import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      trime:true
    },
    skillsUrl: [],
    skillsName: [],
    role:{
      type:String,
      required:true,
      
    }
  },
  
  { timestamps: true }
);



const Skills=mongoose.model("Skills",skillsSchema)

export default Skills

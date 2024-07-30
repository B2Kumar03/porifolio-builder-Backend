import mongoose from "mongoose";
import { type } from "os";

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
      
    },
    role_description:{
      type:String,
      required:true,
      trime:true
    }
  },
  
  { timestamps: true }
);



const Skills=mongoose.model("Skills",skillsSchema)

export default Skills

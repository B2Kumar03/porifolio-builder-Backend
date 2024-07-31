import { asyncHandler } from "../utils/asynchandler.js";
// import Skill from "../models/skills.model.js"
import Skills from "../models/skills.model.js";
import { generator } from "./ai.controllers.js";

const skillsController = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const { skillsUrl, skillsName, role } = req.body;
  const prompt = `${role} write about this role for me. I will use it as a portfolio heading in 20 words, using these skills: ${skillsName.join(
    ", "
  )}`;

  const role_description1 = await generator(prompt);
  
  
  if (role_description1 == null) {
    return res.status(400).json({ message: "Role description not generated" });
  }
  let role_description
  if(role_description1[0]=="#"){
    role_description = role_description1.slice(1)
    if(role_description1[0]=="#"){
      role_description = role_description.slice(1)
    }
    
  }
  if (!skillsUrl || !skillsName || !role) {
    return res.status(400).json({ message: "Please provide skills" });
  }
  const user = await Skills.findOne({ email });
  if (user) {
    const data = await Skills.updateOne(
      {
        email: email,
      },
      {
        $set: {
          skillsUrl: skillsUrl,
          skillsName: skillsName,
          role: role,
          role_description,
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ message: "Skills updated successfully" });
  }
  const r = await Skills.create({ skillsUrl, skillsName, email, role,role_description });
  if (!r) {
    return res.status(400).json({ message: "Failed to create skills" });
  }
  res.json({ message: "Skills created successfully" });
});

// Controller to get skills
const getSkills = asyncHandler(async (req, res) => {
  const { email } = req.user;

  // Fetch skills from the database based on the user's email
  const skills = await Skills.findOne({ email });

  if (!skills) {
    return res.status(404).json({ message: "Skills not found" });
  }

  return res.json({ skills });
});

export { skillsController, getSkills };

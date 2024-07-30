import express from "express";
import path from "path";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/projectRouter.routes.js";
import personalDatilsRoutes from "./routes/personalDetails.routes.js";
import skills from "./routes/skills.routes.js";
import otpSender from "./routes/otpSender.controller.js";
import cors from "cors";
import aiRouter from "./routes/ai.routes.js";
import resumeRoute from "./routes/resumeUploader.routes.js";
import { fileURLToPath } from "url";
import Project from "./models/project.model.js";
import accessAuthMiddleware from "./middlewares/accessAuth.middleware.js";
import User from "./models/user.model.js";
import Resume from "./models/uploadResume.model.js";
import PersonalDetails from "./models/personalDetails.js";
import Skills from "./models/skills.model.js";
import { gihubData } from "./github.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/users", userRouter); //ad
app.use("/api/v1/users", projectRouter);
app.use("/api/v1/users", personalDatilsRoutes);
app.use("/api/v1/users", skills);
app.use("/api/v1/users", otpSender);

app.use("/api/v1/users", aiRouter);
app.use("/api/v1/users", resumeRoute);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.get("/:id", async (req, res) => {
  const _id = req.params.id.split("+")[1];
  const user = await User.findById(_id).select("-password -token");
  if(!user){
    return res.send("<h1>Check your portfolio URL")
  }
  const project = await Project.find({
    userId: user.email,
  });
  const resume = await Resume.findOne({ email: user.email });
  const personalDetails = await PersonalDetails.findOne({ email: user.email });
  const skills = await Skills.findOne({ email: user.email });
  console.log(user);
  console.log(project);
  console.log(resume);
  console.log(personalDetails);
  const newSkill = skills.skillsUrl.map((ele, index) => {
    return { url: ele, name: skills.skillsName[index] };
  });
  const newProject = project.map((ele) => {
    const n = ele.techstack[0].split(",");
    return {
      userId: ele.userId,
      demoLink: ele.demoLink,
      projectTitle: ele.projectTitle,
      projectDescription: ele.projectDescription,
      githubLink: ele.githubLink,
      projectImage: ele.projectImage,
      techstack: n,
    };
  });
  let githubId = "";
  for (let i = personalDetails.github.length - 1; i > 0; i--) {
    if (personalDetails.github[i] != "/") {
      githubId = githubId + personalDetails.github[i];
    } else {
      githubId=githubId.split("").reverse().join("")
      break;
    }
  }
 
  const githubDat = await gihubData(githubId);
  console.log(githubDat);
  // const project = Project.find;
  res.render("index", {
    project_data: newProject,
    techstack: newSkill,
    contact: {
      mobile: personalDetails.phoneNumber,
      email: personalDetails.email,
      linkedin: personalDetails.linkedIn,
      github: personalDetails.github,
    },
    name: personalDetails.fullName,
    role: skills.role,
    role_description: skills.role_description,
    about: personalDetails.summary,
    resume_url: resume.url,
    githuburl: personalDetails.github,
    githubdata:githubDat,
    avtar: user.avtar,
  });
});

export default app;

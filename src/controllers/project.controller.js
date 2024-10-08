import { asyncHandler } from "../utils/asynchandler.js";
import cloudinaryUpload from "../utils/cloudnaryUpload.js";
import Project from "../models/project.model.js";
import { assert } from "console";

// Function to handle both create and update project
const project = asyncHandler(async (req, res) => {
  const {
    projectTitle,
    projectDescription,
    techstack,
    userId,
    demoLink,
    githubLink,
  } = req.body;

  if (
    !projectTitle ||
    !projectDescription ||
    !techstack ||
    !userId ||
    !demoLink ||
    !githubLink
  ) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the fields" });
  }

  let cloudinaryUrl = { url: null };

  const localPathFile = req.file?.path;
  console.log("LocalPath :", localPathFile);
  if (!localPathFile) {
    return res
      .status(400)
      .json({ success: false, msg: "Please upload an image" });
  }
  if (localPathFile) {
    cloudinaryUrl = await cloudinaryUpload(localPathFile);
    if (!cloudinaryUrl) {
      return res
        .status(400)
        .json({ success: false, msg: "Image upload failed" });
    }
  }

  const projectData = {
    projectTitle,
    projectDescription,
    techstack,
    githubLink,
    demoLink,
    projectImage: cloudinaryUrl.url,
    userId,
  };

  let savedProject;

  savedProject = await Project.create(projectData);

  if (!savedProject) {
    return res
      .status(400)
      .json({ success: false, msg: "Project operation failed" });
  }

  const successMsg = res.status(200).json({
    success: true,
    msg: "project savedsuccessfully",
    data: savedProject,
  });
});

const getProject = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.email) {
      return res
        .status(400)
        .json({ message: "User or email not provided", success: false });
    }

    const email = user.email;
    const data = await Project.find({
      userId: email,
    });
    
    if (!data) {
      return res
        .status(404)
        .json({ message: "No projects found", success: false });
    }

    const newData=data.map((ele)=>{
      let teck=ele.techstack[0]
      let arr=teck.split(",")
      // console.log(ele);
      ele.techstack=arr
      return ele

    })
   
    res.status(200).json({data:newData, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {
    projectTitle,
    projectDescription,
    techstack,
    userId,
    demoLink,
    githubLink,
  } = req.body;

  if (
    !id ||
    !projectTitle ||
    !projectDescription ||
    !techstack ||
    !userId ||
    !demoLink ||
    !githubLink
  ) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all the fields" });
  }

  const projectData = {
    projectTitle,
    projectDescription,
    techstack,
    githubLink,
    demoLink,
    userId,
  };

  const updatedProject = await Project.findByIdAndUpdate(
    {_id:id},
    { $set: projectData },
    { new: true, runValidators: true }
  );

  if (!updatedProject) {
    return res
      .status(400)
      .json({ success: false, msg: "Project update failed" });
  }

  return res.status(200).json({
    success: true,
    msg: "Project updated successfully",
    data: updatedProject,
  });
});




export { project, getProject,updateProject };

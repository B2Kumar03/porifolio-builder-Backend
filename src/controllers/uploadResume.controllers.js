import Resume from "../models/uploadResume.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import cloudinaryUpload from "../utils/cloudnaryUpload.js";





const uploadResume = asyncHandler(async (req, res) => {
  const email = req.user.email;
  console.log(email);

  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  const localPathFile = req.file?.path;

  if (!localPathFile) {
    return res.status(400).json({ success: false, message: "Please upload a file" });
  }

  const cloudinaryUrl = await cloudinaryUpload(localPathFile);

  if (!cloudinaryUrl.url) {
    return res.status(500).json({ success: false, message: "Error occurred while uploading file" });
  }

  let resume = await Resume.findOne({ email });

  if (resume) {
    // Update existing resume
    resume.url = cloudinaryUrl.url;
    await resume.save();
  } else {
    // Create new resume
    resume = await Resume.create({
      email,
      url: cloudinaryUrl.url,
    });
  }

  return res.status(200).json({ success: true, message: "Resume uploaded successfully", data: resume });
});




const getResume = asyncHandler(async (req, res) => {
  const email = req.user.email;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  const resume = await Resume.findOne({ email });

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  return res.status(200).json({ success: true, data: resume });
});




export {
  uploadResume,
  getResume
};

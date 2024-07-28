import { Router } from "express";
import { getResume, uploadResume } from "../controllers/uploadResume.controllers.js";
import { upload } from "../middlewares/multer.js"
import accessAuthMiddleware from "../middlewares/accessAuth.middleware.js";

const resumeRoute = Router();
resumeRoute.route("/upload-resume").post(accessAuthMiddleware,upload.single("url"),uploadResume);
resumeRoute.route("/get-resume").get(accessAuthMiddleware,getResume);



export default resumeRoute
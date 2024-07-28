import {Router} from "express"
import authMiddleware from "../middlewares/auth.js"
import {getProject,project, updateProject} from "../controllers/project.controller.js"
import { upload } from "../middlewares/multer.js"
import accessAuthMiddleware from "../middlewares/accessAuth.middleware.js"

const projectRouter=Router()

projectRouter.route("/project").post(upload.single("projectImage"),project)
projectRouter.route("/get-project").get(accessAuthMiddleware,getProject)
projectRouter.route("/update-project/:id").patch(updateProject)

export default projectRouter
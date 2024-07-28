import { Router } from "express";
import {skillsController ,getSkills} from "../controllers/skills.controller.js";
import accessAuthMiddleware from "../middlewares/accessAuth.middleware.js";

const skillsRoutes = Router();

skillsRoutes.route("/skills").post(accessAuthMiddleware,skillsController);
skillsRoutes.route("/get-skill").get(accessAuthMiddleware,getSkills)


export default skillsRoutes

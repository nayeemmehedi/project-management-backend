import express from "express"
import { deleletProjectId, projectController, projectGet, projectGetbyId, updateProject } from "../controllers/project.conrollers.js";


const projectRoutes = express.Router();

projectRoutes.post('/project',projectController )
projectRoutes.get('/project',projectGet )
projectRoutes.get('/project/:id',projectGetbyId )
projectRoutes.patch('/project/:id', updateProject);
projectRoutes.delete('/project/:id',deleletProjectId )







export { projectRoutes}

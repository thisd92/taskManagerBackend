import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  deleteProject,
  findProjectById,
  findProjectsByCompany,
  saveProject,
  updateProject,
} from "../controllers/projectController";

export const projectRouter = Router();

projectRouter.get("/projects", authenticate, findProjectsByCompany);

projectRouter.post("/projects", authenticate, saveProject);

projectRouter.put("/projects/:id", authenticate, updateProject);

projectRouter.delete("/projects/:id", authenticate, deleteProject);

projectRouter.get("/projects/:id", authenticate, findProjectById);

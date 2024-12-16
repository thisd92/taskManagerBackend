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

projectRouter.get("/", authenticate, findProjectsByCompany);

projectRouter.post("/", authenticate, saveProject);

projectRouter.put("/:id", authenticate, updateProject);

projectRouter.delete("/:id", authenticate, deleteProject);

projectRouter.get("/:id", authenticate, findProjectById);

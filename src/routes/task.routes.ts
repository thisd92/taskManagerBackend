import {
  deleteTask,
  getTasksByCompany,
  getTaskById,
  getTasksByProject,
  createTask,
  updateTask,
  getTasks,
} from "../controllers/task.controller";
import { authenticate } from "../middlewares/authenticate";
import { Router } from "express";

export const taskRouter = Router();

taskRouter.get("/", authenticate, getTasksByProject);

taskRouter.get("/c", authenticate, getTasksByCompany);

taskRouter.post("/", authenticate, createTask);

taskRouter.put("/:id", authenticate, updateTask);

taskRouter.delete("/:id", authenticate, deleteTask);

taskRouter.get("/:id", authenticate, getTaskById);

taskRouter.get("/allTasks", getTasks)

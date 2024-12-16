import {
  deleteTask,
  findAllTasks,
  findTaskById,
  findTasksByProject,
  saveTask,
  updateTask,
} from "../controllers/taskController";
import { authenticate } from "../middlewares/authenticate";
import { Router } from "express";

export const taskRouter = Router();

taskRouter.get("/", authenticate, findTasksByProject);

taskRouter.get("/allTasks", authenticate, findAllTasks);

taskRouter.post("/", authenticate, saveTask);

taskRouter.put("/:id", authenticate, updateTask);

taskRouter.delete("/:id", authenticate, deleteTask);

taskRouter.get("/:id", authenticate, findTaskById);

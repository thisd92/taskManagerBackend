import { authenticate } from "../middlewares/authenticate";
import { Router } from "express";

export const taskRouter = Router();
const taskController = require("../controllers/taskController");

taskRouter.get("/tasks", authenticate, taskController.findTasksByProject);

taskRouter.get("/allTasks", authenticate, taskController.findAllTasks);

taskRouter.post("/tasks", authenticate, taskController.save);

taskRouter.put("/tasks/:id", authenticate, taskController.update);

taskRouter.delete("/tasks/:id", authenticate, taskController.delete);

taskRouter.get("/tasks/:id", authenticate, taskController.findTaskById);


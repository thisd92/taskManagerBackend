import { Request, Response, NextFunction } from "express";
import {
  deleteTaskService,
  findAllTasksService,
  findTaskByIdService,
  findTasksByProjectService,
  saveTaskService,
  updateTaskService,
} from "../services/taskService";

const findTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findTasksByProjectService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const findAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findAllTasksService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const saveTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await saveTaskService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateTaskService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteTaskService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const findTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findTaskByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export {
  findTaskById,
  deleteTask,
  updateTask,
  saveTask,
  findAllTasks,
  findTaskByIdService,
  findTasksByProject,
};

import { Request, Response, NextFunction } from "express";
import {
  deleteTaskService,
  findAllTasks,
  findTaskById,
  findTasks,
  findTasksByProject,
  saveTask,
  updateTaskService,
} from "../services/task.service";

const getTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, company } = req.body.user;
    const { projectId } = req.query;

    const tasks = await findTasksByProject(id, company, String(projectId));

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasksByCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company } = req.body.user;
    const tasks = await findTasks(company);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await findAllTasks();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, company } = req.body.user;
    const { project, ...taskData } = req.body;

    const task = await saveTask(id, company, project, taskData);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body: updatedTask,
    } = req;
    const task = await updateTaskService(id, updatedTask);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = req;

    await deleteTaskService(id);

    res.status(200).json({
      message: "Task deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = req;

    const task = await findTaskById(id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export {
  getTaskById,
  deleteTask,
  updateTask,
  createTask,
  getTasks,
  getTasksByCompany,
  getTasksByProject,
};

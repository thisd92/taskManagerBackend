import { Request, Response, NextFunction } from "express";
import { Project } from "../models/project";
import { Task } from "../models/task";
import { readToken } from "./tokenService";

const findTasksByProjectService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, company } = req.body.user;
    const { projectId } = req.query;
    const tasks = await Task.find({
      "createdBy.company": company,
      project: projectId,
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const findAllTasksService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, company } = req.body.user;
    const tasks = await Task.find({
      "createdBy.company": company,
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const saveTaskService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, company } = req.body.user;
    if (!id) {
      return res.status(401).json({ message: "Usuário inválido" });
    }

    if (!company) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

    const newTask = new Task({
      ...req.body,
      createdBy: { user: id, company: company },
    });

    const savedTask = await newTask.save();

    const { project } = req.body;
    if (project) {
      try {
        await Project.findByIdAndUpdate(
          project,
          { $push: { tasks: savedTask._id } },
          { new: true }
        );
      } catch (error) {
        console.log(error);
      }
    }

    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

const updateTaskService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body: updatedTask,
    } = req;
    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    if (!task) {
      res.status(404).json({
        error: true,
        message: "Task não encontrada",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTaskService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = req;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Task não encontrada",
      });
    }

    res.status(200).json({
      message: "Task deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const findTaskByIdService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const token = req.headers.authorization;
    if (!token) {
      return;
    }
    const decodedToken = readToken(token);
    const { company } = decodedToken;
    const task = await Task.findOne({ _id: id, "createdBy.company": company });
    if (!task) {
      res.status(404).json({
        error: true,
        message: "Tarefa não encontrada",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export {
  saveTaskService,
  findAllTasksService,
  findTasksByProjectService,
  findTaskByIdService,
  deleteTaskService,
  updateTaskService,
};

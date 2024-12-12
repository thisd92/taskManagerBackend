import { Request, Response, NextFunction } from "express";
const taskService = require("../services/taskService");

exports.findTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskService.findTasksByProject(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskService.findAllTasks(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.save(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.delete(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskService.findTaskById(req, res, next);
  } catch (error) {
    next(error);
  }
};

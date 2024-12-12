import { Request, Response, NextFunction } from "express";

const projectService = require("../services/projectService");

export const saveProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.save(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findProjectsByCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.findProjectsByCompany(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.deleteProject(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.findProjectById(req, res, next);
  } catch (error) {
    next(error);
  }
};

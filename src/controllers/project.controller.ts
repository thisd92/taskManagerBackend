import { Request, Response, NextFunction } from "express";
import {
  deleteProjectService,
  findProjectByIdService,
  findProjectsByCompanyService,
  saveProjectService,
  updateProjectService,
} from "../services/project.service";

export const saveProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await saveProjectService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findProjectsByCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findProjectsByCompanyService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateProjectService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteProjectService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findProjectByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

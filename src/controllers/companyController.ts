import { Request, Response, NextFunction } from "express";
import {
  createCompanyService,
  findAllCompanyService,
} from "../services/companyService";

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createCompanyService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findAllCompanyService(req, res, next);
  } catch (error) {
    next(error);
  }
};

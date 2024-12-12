import { Request, Response, NextFunction } from "express";
const companyService = require("../services/companyService");

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await companyService.create(req, res, next);
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
    await companyService.findAll(req, res, next);
  } catch (error) {
    next(error);
  }
};

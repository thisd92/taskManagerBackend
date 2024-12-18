import { Request, Response, NextFunction } from "express";
import { Company } from "../models/company.model";
import { MongoError } from "mongodb";

const createCompanyService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      return res.status(400).json({
        error: true,
        message: "Companhia já cadastrada.",
      });
    }
    next(error);
  }
};

const findAllCompanyService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companys = await Company.find();
    res.json(companys);
  } catch (error) {
    next(error);
  }
};

export { createCompanyService, findAllCompanyService };

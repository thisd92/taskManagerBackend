import { Request, Response, NextFunction } from "express";
import { Company } from "../models/company";
import { MongoError } from "mongodb";

const create = async (req: Request, res: Response, next: NextFunction) => {
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

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companys = await Company.find();
    res.json(companys);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findAll };

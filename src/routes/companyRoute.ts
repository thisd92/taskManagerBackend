import { Router } from "express";
import {
  createCompany,
  findAllCompanies,
} from "../controllers/companyController";

export const companyRouter = Router();

companyRouter.post("/", createCompany);
companyRouter.get("/", findAllCompanies);

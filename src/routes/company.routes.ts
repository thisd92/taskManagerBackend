import { Router } from "express";
import {
  createCompany,
  findAllCompanies,
} from "../controllers/company.controller";

export const companyRouter = Router();

companyRouter.post("/", createCompany);
companyRouter.get("/", findAllCompanies);

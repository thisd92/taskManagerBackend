import { Request, Response, NextFunction } from "express";
import { signinService, forgetService } from "../services/auth.service";

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await signinService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const forget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await forgetService(req, res, next);
  } catch (error) {
    next(error);
  }
};

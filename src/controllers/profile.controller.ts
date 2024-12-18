import { Request, Response, NextFunction } from "express";
import { findProfile } from "../services/profile.service";

export const profileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findProfile(req, res, next);
  } catch (error) {
    next(error);
  }
};

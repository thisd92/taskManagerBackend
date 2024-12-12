import { Request, Response, NextFunction } from "express";
import {
  findUserService,
  saveUserService,
  findUsersForCompanyService,
  findAllUsersService,
  deleteUserService,
  updateUserService,
} from "../services/userService";

export const findUsersForCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findUsersForCompanyService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await saveUserService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findAllUsersService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findUserService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateUserService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteUserService(req, res, next);
  } catch (error) {
    next(error);
  }
};

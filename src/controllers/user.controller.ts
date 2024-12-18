import { Request, Response, NextFunction } from "express";
import {
  findUserById,
  createUserService,
  findUsersByCompany,
  findUsers,
  deleteUserById,
  updateUserService,
} from "../services/user.service";
import { CustomError } from "../utils/CustomError";

export const getUserByCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company } = req.body.user;
    if (!company) throw new CustomError("Empresa inválida", 400);

    const users = await findUsersByCompany(company);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await findUserById(id);

    res.json(user);
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
    const {
      params: { id },
      body: updatedUser,
    } = req;

    const userUpdated = await updateUserService(id, updatedUser);

    res.json(userUpdated);
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
    const {
      params: { id },
    } = req;

    await deleteUserById(id);
    res.status(200).json({
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

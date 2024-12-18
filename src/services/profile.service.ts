import { Request, Response, NextFunction } from "express";
import { readToken } from "./token.service";
import { CustomError } from "../utils/CustomError";

export const findProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decodedToken = readToken(token);
      const { id } = decodedToken;
      if (!id) throw new CustomError("Usuário não encontrado", 404);

      res.status(200).json(id);
    }
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import { readToken } from "./tokenService";

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
      if (!id) {
        res.status(404).json({
          error: true,
          message: "Usuário não encontrado",
        });
      }
      res.status(200).json(id);
    }
  } catch (error) {
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { readToken } from "../services/tokenService";
import { IUser } from "../models/user";

export interface AuthRequest extends Request {
  body: {
    user?: IUser;
  };
}

// Middleware de autenticação
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }
  try {
    const decodedToken = readToken(token);
    req.body.user = decodedToken as IUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};

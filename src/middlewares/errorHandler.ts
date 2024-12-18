import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

// Middleware de tratamento de erros
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof CustomError ? err.status : 500;
  const message = err.message || "Erro interno do servidor";

  console.error(`[Error] ${status} - ${message}`);
  res.status(status).json({
    error: true,
    message,
  });
}

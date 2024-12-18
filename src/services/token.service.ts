import { IUser } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET!;
if (!SECRET) {
  throw new Error("JWT_SECRET não configurado.");
}

export const createToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, company: user.company, email: user.email, name: user.name },
    SECRET
  );
};

export const readToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
};

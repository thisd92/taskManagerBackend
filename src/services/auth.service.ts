import { Request, Response, NextFunction } from "express";
import { createToken } from "./token.service";
import { Company } from "../models/company.model";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { CustomError } from "../utils/CustomError";

export const signinService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: userLogin } = req;

    const company = await Company.findOne({ name: userLogin.company });
    if (!company) throw new CustomError("Empresa inválida", 401);

    const user = await User.findOne({ email: userLogin.email });
    if (!user) throw new CustomError("Email ou senha inválidos", 401);

    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      user.password
    );

    if (!isPasswordValid)
      throw new CustomError("Email ou senha inválidos", 401);

    if (String(company._id) !== String(user.company))
      throw new CustomError("Empresa inválida", 401);

    const token = createToken(user);

    res
      .status(200)
      .cookie("authorization", token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
      })
      .json(token);
  } catch (error) {
    next(error);
  }
};

export const forgetService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { email },
    } = req;
    const user = await User.findOne({ email: email });

    if (!user) throw new CustomError("Email inválido", 401);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

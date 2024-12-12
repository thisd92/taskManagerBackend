import { Request, Response, NextFunction } from "express";
import { createToken } from "./tokenService"; 

const Company = require("../models/company");
const User = require("../models/user");
const bcrypt = require("bcrypt");

export const signinService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: userLogin } = req;
    const company = await Company.findOne({ name: userLogin.companyName });
    if (!company) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

    const user = await User.findOne({ email: userLogin.email });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    if (String(company._id) !== String(user.company)) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

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

    if (!user) {
      res.status(400).send("Email inválido");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

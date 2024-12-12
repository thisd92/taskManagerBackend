import { User } from "../models/user";
import { Company } from "../models/company";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import { Squad } from "../models/squad";

const findUsersForCompanyService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company } = req.body.user;
    const users = await User.find({ company: company });
    if (!users) {
      return res.status(404).json({
        error: true,
        message: "Nenhum usuário encontrado para essa empresa.",
      });
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const saveUserService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyName, email, password } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Nome da empresa, e-mail e senha são obrigatórios.",
      });
    }

    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(404).json({
        error: true,
        message: "Empresa não encontrada.",
      });
    }

    const user = new User(req.body);
    user.company = String(company._id);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      return res.status(400).json({
        error: true,
        message: "Email já utilizado.",
      });
    }
    console.error(error);
    next(error);
  }
};

const findAllUsersService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: true, message: "Nenhum usuário encontrado." });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const findUserService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body: updatedUser,
    } = req;

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }

    if (updatedUser.squad) {
      // Se o usuário estava em uma squad anterior, remova-o da squad anterior
      if (user.squad && user.squad !== updatedUser.squad) {
        await Squad.findByIdAndUpdate(user.squad, {
          $pull: { users: updatedUser._id },
        });
      }

      // Encontre a squad atualizada
      const squad = await Squad.findOne({ _id: updatedUser.squad });

      if (!squad) {
        return res.status(404).json({ message: "Squad não encontrada" });
      }

      // Verifique se o usuário já está na squad
      if (squad.users.includes(updatedUser._id)) {
        return res.status(400).json({
          message: "Usuário já está na Squad",
        });
      }

      // Adicione o usuário à nova squad
      await Squad.findByIdAndUpdate(
        updatedUser.squad,
        { $push: { users: updatedUser._id } },
        { new: true }
      );
    }

    // Retorna o usuário atualizado
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUserService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }

    res.status(200).json({
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  saveUserService,
  findAllUsersService,
  findUserService,
  findUsersForCompanyService,
  deleteUserService,
  updateUserService,
};

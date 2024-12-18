import { IUser, User } from "../models/user.model";
import { Company } from "../models/company.model";
import * as bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import { Squad } from "../models/squad.model";
import { CustomError } from "../utils/CustomError";

const findUsersByCompany = async (company: string) => {
  const users = await User.find({ company: company });
  if (users.length === 0)
    throw new CustomError("Nenhum usuário encontrado para empresa", 404);
  return users;
};

const createUserService = async (userData: IUser) => {
  try {
    const { company, email, password, ...otherData } = userData;

    if (!company || !email || !password)
      throw new CustomError(
        "Nome da empresa, e-mail e senha são obrigatórios.",
        400
      );

    const comp = await Company.findOne({ name: company });
    if (!comp) throw new CustomError("Empresa não encontrada", 404);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...otherData,
      email,
      password: hashedPassword,
      company: String(comp._id),
    });

    const userCreated = await user.save();

    return userCreated;
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new CustomError("Email já utilizado.", 400);
    }
    throw error;
  }
};

const findUsers = async () => {
  const users = await User.find();
  if (users.length === 0)
    throw new CustomError("Nenhum usuário encontrado", 404);
  return users;
};

const findUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new CustomError("Usuário não encontrado", 404);
  return user;
};

const updateUserService = async (id: string, updatedUser: IUser) => {
  const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
  if (!user) throw new CustomError("Usuário não encontrado", 404);

  if (updatedUser.squad) {
    // Remove o usuário de uma squad, se o usuário já estava em uma squad anterior
    if (user.squad && user.squad !== updatedUser.squad) {
      await Squad.findByIdAndUpdate(user.squad, {
        $pull: { users: updatedUser._id },
      });
    }

    // Encontra a squad atualizada
    const squad = await Squad.findOne({ _id: updatedUser.squad });

    if (!squad) throw new CustomError("Squad não encontrada", 404);

    // Verifica se o usuário já está na squad
    if (squad.users.includes(updatedUser._id))
      throw new CustomError("Usuário já está na Squad", 400);

    // Adiciona o usuário à nova squad
    await Squad.findByIdAndUpdate(
      updatedUser.squad,
      { $push: { users: updatedUser._id } },
      { new: true }
    );
  }

  // Retorna o usuário atualizado
  return user;
};

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) throw new CustomError("Usuário não encontrado", 404);
};

export {
  createUserService,
  findUsers,
  findUserById,
  findUsersByCompany,
  deleteUserById,
  updateUserService,
};

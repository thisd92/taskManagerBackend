import { Request, Response, NextFunction } from "express";
import { Company } from "../models/company.model";
import { Squad } from "../models/squad.model";
import { CustomError } from "../utils/CustomError";

const findSquad = async (company: String) => {
  const squad = await Squad.find({ company: company });

  return squad;
};

const findAllSquads = async () => {
  const squads = await Squad.find();
  if (squads.length === 0) throw new CustomError("Squad não encontrada", 404);

  return squads;
};

const saveSquad = async (
  id: String,
  company: String,
  squadData: typeof Squad
) => {
  if (!id) throw new CustomError("Usuário inválido", 401);

  if (!company) throw new CustomError("Empresa inválida", 401);

  const newSquad = new Squad({
    ...squadData,
    company: company,
  });

  const savedSquad = await newSquad.save();

  if (savedSquad._id) {
    await Company.findByIdAndUpdate(
      company,
      { $push: { squads: savedSquad._id } },
      { new: true }
    );
  }
};

const updateSquadService = async (id: String, updatedSquad: typeof Squad) => {
  const squad = await Squad.findByIdAndUpdate(id, updatedSquad, {
    new: true,
  });

  if (!squad) throw new CustomError("Squad não encontrada", 404);

  return squad;
};

const deleteSquadService = async (id: String) => {
  const squad = await Squad.findByIdAndDelete(id);

  if (!squad) throw new CustomError("Squad não encontrada", 404);
};

const findSquadById = async (id: String) => {
  const squad = await Squad.findOne({ _id: id });
  if (!squad) throw new CustomError("Squad não encontrada", 404);
  return squad;
};

export {
  saveSquad,
  deleteSquadService,
  findSquad,
  findSquadById,
  updateSquadService,
  findAllSquads,
};

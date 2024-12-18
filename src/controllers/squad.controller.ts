import { Request, Response, NextFunction } from "express";
import {
  deleteSquadService,
  findAllSquads,
  findSquadById,
  findSquad,
  saveSquad,
  updateSquadService,
} from "../services/squad.service";
import { CustomError } from "../utils/CustomError";

const getSquadByCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company } = req.body.user;

    const squad = await findSquad(company);
    if (!squad) throw new CustomError("Squad não encontrada", 404);

    res.status(200).json(squad);
  } catch (error) {
    if (res.status(404)) {
      console.log("Squad não encontrada");
    }
    next(error);
  }
};

const getSquads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const squads = await findAllSquads();
    res.status(200).json(squads);
  } catch (error) {
    if (res.status(404)) {
      console.log("Não encontrado team");
    }
    next(error);
  }
};

const createSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, company } = req.body.user;
    const { ...squadData } = req.body;

    const savedSquad = await saveSquad(id, company, squadData);

    res.status(201).json(savedSquad);
  } catch (error) {
    next(error);
  }
};

const updateSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body: updatedSquad,
    } = req;
    const squad = await updateSquadService(id, updatedSquad);

    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
};

const deleteSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
    } = req;
    await deleteSquadService(id);
    res.status(200).json({
      message: "Squad deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const getSquadById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const squad = await findSquadById(id);
    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
};

export {
  createSquad,
  updateSquad,
  getSquads,
  getSquadByCompany,
  getSquadById,
  deleteSquad,
};

import { Request, Response, NextFunction } from "express";
import {
  deleteSquadService,
  findAllSquadsService,
  findSquadByIdService,
  findSquadService,
  saveSquadService,
  updateSquadService,
} from "../services/squadService";

const findSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await findSquadService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const findAllSquad = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findAllSquadsService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const saveSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await saveSquadService(req, res, next);
  } catch (error) {
    next(error);
  }
};
const updateSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateSquadService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const deleteSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteSquadService(req, res, next);
  } catch (error) {
    next(error);
  }
};

const findSquadById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await findSquadByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export {
  saveSquad,
  updateSquad,
  findAllSquad,
  findSquad,
  findSquadById,
  deleteSquad,
};

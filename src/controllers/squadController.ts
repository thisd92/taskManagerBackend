import { Request, Response, NextFunction } from "express";

const squadService = require("../services/squadService");

const findSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await squadService.findSquad(req, res, next);
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
    await squadService.findAllSquads(req, res, next)(req, res, next);
  } catch (error) {
    next(error);
  }
};

const saveSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await squadService.save(req, res, next);
  } catch (error) {
    next(error);
  }
};
const updateSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await squadService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

const deleteSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await squadService.deleteSquad(req, res, next);
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
    await squadService.findSquadById(req, res, next);
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

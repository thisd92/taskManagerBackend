import { Request, Response, NextFunction } from "express";
import { Company } from "../models/company";
import { Squad } from "../models/squad";

const findSquadService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company } = req.body.user;
    const squad = await Squad.find({ company: company });
    if (!squad) {
      return res.status(404).json({
        message: "Squad não encontrada",
      });
    }

    res.status(200).json(squad);
  } catch (error) {
    if (res.status(404)) {
      console.log("Não encontrado squad");
    }
    next(error);
  }
};

const findAllSquadsService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const squads = await Squad.find();
    res.status(200).json(squads);
  } catch (error) {
    if (res.status(404)) {
      console.log("Não encontrado team");
    }
    next(error);
  }
};

const saveSquadService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, company } = req.body.user;
    if (!id) {
      return res.status(401).json({ message: "Usuário inválido" });
    }

    if (!company) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

    const newSquad = new Squad({
      ...req.body,
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

    res.status(201).json(savedSquad);
  } catch (error) {
    next(error);
  }
};

const updateSquadService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
      body: updatedSquad,
    } = req;
    const squad = await Squad.findByIdAndUpdate(id, updatedSquad, {
      new: true,
    });

    if (!squad) {
      res.status(404).json({
        error: true,
        message: "Squad não encontrada",
      });
    }
    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
};

const deleteSquadService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const squad = await Squad.findByIdAndDelete(id);

    if (!squad) {
      return res.status(404).json({
        error: true,
        message: "Squad não encontrada",
      });
    }

    res.status(200).json({
      message: "Squad deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const findSquadByIdService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    console.log(id);
    const squad = await Squad.findOne({ _id: id });
    if (!squad) {
      return res.status(404).json({
        error: true,
        message: "Squad não encontrada",
      });
    }
    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
};

export {
  saveSquadService,
  deleteSquadService,
  findSquadService,
  findSquadByIdService,
  updateSquadService,
  findAllSquadsService,
};

import { Request, Response, NextFunction } from "express";
import { Company } from "../models/company.model";
import { Project } from "../models/project.model";
import { CustomError } from "../utils/CustomError";

const saveProjectService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, company } = req.body.user;
    if (!id) throw new CustomError("Usuário inválido", 401);

    if (!company) throw new CustomError("Empresa inválida", 401);

    const newProject = new Project({
      ...req.body,
      createdBy: { user: id, company: company },
    });

    const savedProject = await newProject.save();

    if (savedProject._id) {
      await Company.findByIdAndUpdate(
        company,
        { $push: { projects: savedProject._id } },
        { new: true }
      );
    }

    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

const findProjectsByCompanyService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, company } = req.body.user;
    const projects = await Project.find({ "createdBy.company": company });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

const updateProjectService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
      body: updatedProject,
    } = req;
    const project = await Project.findByIdAndUpdate(id, updatedProject, {
      new: true,
    });

    if (!project) throw new CustomError("Projeto não encontrado", 404);

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProjectService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const project = await Project.findByIdAndDelete(id);

    if (!project) throw new CustomError("Projeto não encontrado", 404);

    res.status(200).json({
      message: "Projeto deletado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const findProjectByIdService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = req;
    const { company } = req.body.user;
    const project = await Project.findOne({
      _id: id,
      "createdBy.company": company,
    });
    if (!project) throw new CustomError("Projeto não encontrado", 404);

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export {
  findProjectByIdService,
  findProjectsByCompanyService,
  saveProjectService,
  deleteProjectService,
  updateProjectService,
};

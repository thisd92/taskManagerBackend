import { Request, Response, NextFunction } from "express";
import { Company } from "../models/company";
import { Project } from "../models/project";

const saveProjectService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, company } = req.body.user;
    if (!id) {
      return res.status(401).json({ message: "Usuário inválido" });
    }

    if (!company) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

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

const updateProjectService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id },
      body: updatedProject,
    } = req;
    const project = await Project.findByIdAndUpdate(id, updatedProject, {
      new: true,
    });

    if (!project) {
      res.status(404).json({
        error: true,
        message: "Project não encontrada",
      });
    }
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

    if (!project) {
      return res.status(404).json({
        error: true,
        message: "Project não encontrada",
      });
    }

    res.status(200).json({
      message: "Project deletada com sucesso",
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
    if (!project) {
      return res.status(404).json({
        error: true,
        message: "Projeto não encontrado",
      });
    }
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

const projectService = require("../services/projectService");

exports.save = async (req, res, next) => {
  try {
    await projectService.save(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findProjectsByCompany = async (req, res, next) => {
  try {
    await projectService.findProjectsByCompany(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await projectService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await projectService.deleteProject(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findProjectById = async (req, res, next) => {
  try {
    await projectService.findProjectById(req, res, next);
  } catch (error) {
    next(error);
  }
};

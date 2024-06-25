const taskService = require("../services/taskService");

exports.findTasksByProject = async (req, res, next) => {
  try {
    await taskService.findTasksByProject(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findAllTasks = async (req, res, next) => {
  try {
    await taskService.findAllTasks(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    await taskService.save(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await taskService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await taskService.delete(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findTaskById = async (req, res, next) => {
  try {
    await taskService.findTaskById(req, res, next);
  } catch (error) {
    next(error);
  }
};

const userService = require("../services/userService");

exports.findUsersForCompany = async (req, res, next) => {
  try {
    await userService.findUsersForCompany(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.saveUser = async (req, res, next) => {
  try {
    await userService.saveUser(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    await userService.findAll(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findUser = async (req, res, next) => {
  try {
    await userService.findUser(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await userService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await userService.delete(req, res, next);
  } catch (error) {
    next(error);
  }
};

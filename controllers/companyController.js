const companyService = require("../services/companyService");

exports.create = async (req, res, next) => {
  try {
    await companyService.create(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    await companyService.findAll(req, res, next);
  } catch (error) {
    next(error);
  }
};

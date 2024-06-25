const Company = require("../models/company");

const create = async (req, res, next) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: true,
        message: "Companhia já cadastrada.",
      });
    }
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const companys = await Company.find();
    res.json(companys);
  } catch {
    next(error);
  }
};

module.exports = { create, findAll };

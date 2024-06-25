const squadService = require("../services/squadService");

exports.findSquad = async (req, res, next) => {
  try {
    await squadService.findSquad(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findAllSquad = async (req, res, next) => {
  try {
    await squadService.findAllSquads(req, res, next)(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.save = async (req, res, next) => {
  try {
    await squadService.save(req, res, next);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    await squadService.update(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await squadService.deleteSquad(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.findSquadById = async (req, res, next) => {
  try {
    await squadService.findSquadById(req, res, next);
  } catch (error) {
    next(error);
  }
};

const authService = require("../services/authService");

exports.signin = async (req, res, next) => {
  try {
    await authService.signin(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.forget = async (req, res, next) => {
  try {
    await authService.forget(req, res, next);
  } catch (error) {
    next(error);
  }
};

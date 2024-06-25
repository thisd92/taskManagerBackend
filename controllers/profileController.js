const profileService = require("../services/profileService");

exports.find = async (req, res, next) => {
  try {
    await profileService.find(req, res, next);
  } catch (error) {
    next(error);
  }
};

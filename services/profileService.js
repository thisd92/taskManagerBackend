const authService = require("../services/authService");

const find = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = authService.readToken(token);
    const { id } = decodedToken;
    if (!id) {
      res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }
    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
};

module.exports = { find };

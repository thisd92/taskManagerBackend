const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticate } = require("../services/authService");

const router = express.Router();

router.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

router.use(cookieParser());

// Middleware de tratamento de erros
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: true, message: "Erro no servidor" });
}

// ------------------------ PROTECTED ROUTE ------------------------

router.get("/protected", authenticate, (req, res) => {
  res.json({ mensagem: "Bem-vindo à página protegida!" });
});

router.use(errorHandler);

module.exports = router;

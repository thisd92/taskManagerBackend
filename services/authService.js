const Company = require("../models/company");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, company: user.company, email: user.email, name: user.name },
    SECRET
  );
};

const readToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
};

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token inválido" });
  }
  try {
    const decodedToken = readToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

const signin = async (req, res, next) => {
  try {
    const { body: userLogin } = req;
    const company = await Company.findOne({ name: userLogin.companyName });
    if (!company) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

    const user = await User.findOne({ email: userLogin.email });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    if (String(company._id) !== String(user.company)) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

    const token = createToken(user);

    res
      .status(200)
      .cookie("authorization", token, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
      })
      .json(token);
  } catch (error) {
    next(error);
  }
};

const forget = async (req, res, next) => {
  try {
    const {
      params: { email },
    } = req;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).send("Email inválido");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { signin, forget, createToken, readToken, authenticate };

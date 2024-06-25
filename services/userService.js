const User = require("../models/user");
const Company = require("../models/company");
const bcrypt = require("bcrypt");

const findUsersForCompany = async (req, res, next) => {
  try {
    const { company } = req.user;
    const users = await User.find({ company: company });
    res.json(users);
  } catch {
    next(error);
  }
};

const saveUser = async (req, res, next) => {
  try {
    const companyName = req.body.companyName;
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(400).json({
        error: true,
        message: "Empresa não encontrada.",
      });
    }
    const user = new User(req.body);
    user.company = String(company._id);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: true,
        message: "Email já utilizado.",
      });
    }
    next(error);
    res.status(500).json({ error: error.message });
  }
};

const findAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    next(error);
  }
};

const findUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: updatedUser,
    } = req;
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    if (!user) {
      res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }

    if (updatedUser.squad) {
      const squad = await Squad.findOne({ _id: updatedUser.squad });

      if (!squad.users.includes(updatedUser._id)) {
        await Squad.findByIdAndUpdate(
          user.squad,
          { $push: { users: updatedUser._id } },
          { new: true }
        );
      } else {
        return res.status(400).json({
          message: "Usuário já está na Squad",
        });
      }
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({
        error: true,
        message: "Usuário não encontrado",
      });
    }
    res.status(200).json({
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveUser,
  findAll,
  findUser,
  findUsersForCompany,
  deleteUser,
  update,
};

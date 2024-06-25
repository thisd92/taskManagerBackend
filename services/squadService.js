const Company = require("../models/company");
const Squad = require("../models/squad");

const findSquad = async (req, res, next) => {
  try {
    const { company } = req.user;
    const squad = await Squad.find({ company: company });
    if (!squad) {
      return res.status(404).json({
        message: "Squad não encontrada",
      });
    }

    res.status(200).json(squad);
  } catch (error) {
    if (res.status(404)) {
      console.log("Não encontrado squad");
    }
    next(error);
  }
};

const findAllSquads = async (req, res, next) => {
  try {
    const squads = await Squad.find();
    res.status(200).json(squads);
  } catch (error) {
    if (res.status(404)) {
      console.log("Não encontrado team");
    }
    next(error);
  }
};

const save = async (req, res, next) => {
  try {
    const { id, company } = req.user;
    if (!id) {
      return res.status(401).json({ message: "Usuário inválido" });
    }

    if (!company) {
      return res.status(401).json({ message: "Empresa inválida" });
    }

    const newSquad = new Squad({
      ...req.body,
      company: company,
    });

    const savedSquad = await newSquad.save();

    if (savedSquad._id) {
      await Company.findByIdAndUpdate(
        company,
        { $push: { squads: savedSquad._id } },
        { new: true }
      );
    }

    res.status(201).json(savedSquad);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: updatedSquad,
    } = req;
    const squad = await Squad.findByIdAndUpdate(id, updatedSquad, {
      new: true,
    });

    if (!squad) {
      res.status(404).json({
        error: true,
        message: "Squad não encontrada",
      });
    }
    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
};

const deleteSquad = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const squad = await Squad.findByIdAndDelete(id);

    if (!squad) {
      return res.status(404).json({
        error: true,
        message: "Squad não encontrada",
      });
    }

    res.status(200).json({
      message: "Squad deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const findSquadById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    console.log(id);
    const squad = await Squad.findOne({ _id: id });
    if (!squad) {
      return res.status(404).json({
        error: true,
        message: "Squad não encontrada",
      });
    }
    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  save,
  deleteSquad,
  findSquad,
  findSquadById,
  deleteSquad,
  update,
  findAllSquads
};

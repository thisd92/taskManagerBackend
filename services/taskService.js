const Project = require("../models/project");
const Task = require("../models/task");
const authService = require("./authService");

const findTasksByProject = async (req, res, next) => {
  try {
    const { id, company } = req.user;
    const { projectId } = req.query;
    const tasks = await Task.find({
      "createdBy.company": company,
      project: projectId,
    });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const findAllTasks = async (req, res, next) => {
  try {
    const { id, company } = req.user;
    const tasks = await Task.find({
      "createdBy.company": company,
    });
    res.status(200).json(tasks);
  } catch (error) {
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

    const newTask = new Task({
      ...req.body,
      createdBy: { user: id, company: company },
    });

    const savedTask = await newTask.save();

    const { project } = req.body;
    if (project) {
      try {
        await Project.findByIdAndUpdate(
          project,
          { $push: { tasks: savedTask._id } },
          { new: true }
        );
      } catch (error) {
        console.log(error);
      }
    }

    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const {
      params: { id },
      body: updatedTask,
    } = req;
    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

    if (!task) {
      res.status(404).json({
        error: true,
        message: "Task não encontrada",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Task não encontrada",
      });
    }

    res.status(200).json({
      message: "Task deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const findTaskById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const token = req.headers.authorization;
    const decodedToken = authService.readToken(token);
    const { company } = decodedToken;
    const task = await Task.findOne({ _id: id, "createdBy.company": company });
    if (!task) {
      res.status(404).json({
        error: true,
        message: "Tarefa não encontrada",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  save,
  findAllTasks,
  findTasksByProject,
  findTaskById,
  deleteTask,
  update,
};

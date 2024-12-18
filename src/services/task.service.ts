import { Project } from "../models/project.model";
import { Task } from "../models/task.model";
import { readToken } from "./token.service";
import { CustomError } from "../utils/CustomError";
import mongoose from "mongoose";

const findTasksByProject = async (
  id: String,
  company: String,
  projectId: String
) => {
  const tasks = await Task.find({
    "createdBy.company": company,
    project: projectId,
  });

  if (tasks.length === 0)
    throw new CustomError("Nenhuma tarefa encontrada", 400);

  return tasks;
};

const findTasks = async (company: String) => {
  const tasks = await Task.find({
    "createdBy.company": company,
  });

  if (tasks.length === 0)
    throw new CustomError("Nenhuma tarefa encontrada", 400);

  return tasks;
};

const saveTask = async (
  id: String,
  company: String,
  project: String,
  taskData: typeof Task
) => {
  if (!id) throw new CustomError("Usuário inválido", 401);

  if (!company) throw new CustomError("Empresa inválida", 401);

  const newTask = new Task({
    ...taskData,
    project,
    createdBy: { user: id, company: company },
  });

  const savedTask = await newTask.save();

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

  return savedTask;
};

const updateTaskService = async (id: String, updatedTask: typeof Task) => {
  if (!mongoose.Types.ObjectId.isValid(String(id))) {
    throw new CustomError("ID inválido", 400);
  }

  const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

  if (!task) throw new CustomError("Tarefa não encontrada", 404);

  return task;
};

const deleteTaskService = async (id: String) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) throw new CustomError("Tarefa não encontrada", 404);
};

const findTaskById = async (id: String) => {
  const task = await Task.findOne({ _id: id });
  if (!task) throw new CustomError("Tarefa não encontrada", 404);

  return task;
};

const findAllTasks = async () => {
  const tasks = await Task.find();
  if (tasks.length === 0)
    throw new CustomError("Nenhuma tarefa encontrada", 404);

  return tasks;
};

export {
  saveTask,
  findTasks,
  findAllTasks,
  findTasksByProject,
  findTaskById,
  deleteTaskService,
  updateTaskService,
};

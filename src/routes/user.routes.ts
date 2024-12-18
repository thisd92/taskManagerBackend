import { Router } from "express";
import {
  deleteUser,
  getUsers,
  getUserById,
  getUserByCompany,
  createUser,
  updateUser,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/authenticate";

export const userRouter = Router();

userRouter.get("/", authenticate, getUserByCompany);

userRouter.post("/", createUser);

userRouter.get("/users", getUsers);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

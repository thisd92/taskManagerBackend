import { Router } from "express";
import {
  deleteUser,
  findAllUsers,
  findUser,
  findUsersForCompany,
  saveUser,
  updateUser,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

export const userRouter = Router();

userRouter.get("/", authenticate, findUsersForCompany);

userRouter.post("/", saveUser);

userRouter.get("/users", findAllUsers);

userRouter.get("/:id", findUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

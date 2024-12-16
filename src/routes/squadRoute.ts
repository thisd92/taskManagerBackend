import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  saveSquad,
  updateSquad,
  findAllSquad,
  findSquad,
  findSquadById,
  deleteSquad,
} from "../controllers/squadController";

export const squadRouter = Router();

squadRouter.get("/", authenticate, findSquad);

squadRouter.get("/", authenticate, findAllSquad);

squadRouter.post("/", authenticate, saveSquad);

squadRouter.put("/:id", authenticate, updateSquad);

squadRouter.delete("/:id", authenticate, deleteSquad);

squadRouter.get("/:id", authenticate, findSquadById);

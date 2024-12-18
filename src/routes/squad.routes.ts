import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createSquad,
  updateSquad,
  getSquads,
  getSquadByCompany,
  getSquadById,
  deleteSquad,
} from "../controllers/squad.controller";

export const squadRouter = Router();

squadRouter.get("/", authenticate, getSquadByCompany);

squadRouter.get("/", authenticate, getSquads);

squadRouter.post("/", authenticate, createSquad);

squadRouter.put("/:id", authenticate, updateSquad);

squadRouter.delete("/:id", authenticate, deleteSquad);

squadRouter.get("/:id", authenticate, getSquadById);

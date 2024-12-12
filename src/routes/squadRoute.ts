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

squadRouter.get("/squad", authenticate, findSquad);

squadRouter.get("/squads", authenticate, findAllSquad);

squadRouter.post("/squad", authenticate, saveSquad);

squadRouter.put("/squad/:id", authenticate, updateSquad);

squadRouter.delete("/squad/:id", authenticate, deleteSquad);

squadRouter.get("/squad/:id", authenticate, findSquadById);

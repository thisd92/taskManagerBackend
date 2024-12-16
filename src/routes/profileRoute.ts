import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { profileController } from "../controllers/profileController";

export const profileRouter = Router();

profileRouter.get("/", authenticate, profileController);

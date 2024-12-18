import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { profileController } from "../controllers/profile.controller";

export const profileRouter = Router();

profileRouter.get("/", authenticate, profileController);

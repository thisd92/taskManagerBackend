import { Router } from "express";
import { signin, forget } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.get("/forget/:email", forget);

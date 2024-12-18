import Router, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { authenticate } from "../middlewares/authenticate";
import { authRouter } from "./auth.routes";
import { companyRouter } from "./company.routes";
import { profileRouter } from "./profile.routes";
import { projectRouter } from "./project.routes";
import { squadRouter } from "./squad.routes";
import { taskRouter } from "./task.routes";
import { userRouter } from "./user.routes";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();

router.use(cookieParser());

router.use("/auth", authRouter);
router.use("/companies", companyRouter);
router.use("/profiles", profileRouter);
router.use("/projects", projectRouter);
router.use("/squads", squadRouter);
router.use("/tasks", taskRouter);
router.use("/users", userRouter);

// ------------------------ PROTECTED ROUTE ------------------------

router.get("/protected", authenticate, (req: Request, res: Response) => {
  res.json({ mensagem: "Bem-vindo à página protegida!" });
});

router.use(errorHandler);

export default router;

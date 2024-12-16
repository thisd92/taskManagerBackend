import Router, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { authenticate } from "../middlewares/authenticate";
import { authRouter } from "./authRoute";
import { companyRouter } from "./companyRoute";
import { profileRouter } from "./profileRoute";
import { projectRouter } from "./projectRoute";
import { squadRouter } from "./squadRoute";
import { taskRouter } from "./taskRoute";
import { userRouter } from "./userRoute";
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

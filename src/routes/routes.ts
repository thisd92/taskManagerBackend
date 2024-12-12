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
router.use("/company", companyRouter);
router.use("/profile", profileRouter);
router.use("/project", projectRouter);
router.use("/squad", squadRouter);
router.use("/task", taskRouter);
router.use("/user", userRouter);

// ------------------------ PROTECTED ROUTE ------------------------

router.get("/protected", authenticate, (req: Request, res: Response) => {
  res.json({ mensagem: "Bem-vindo à página protegida!" });
});

router.use(errorHandler);

export default router;

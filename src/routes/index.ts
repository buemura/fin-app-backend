import { Router, type Request, type Response } from "express";

import { accountRouter } from "./account-routes";
import { authRouter } from "./auth-routes";
import { expenseRouter } from "./expense-routes";
import { investmentRouter } from "./investment-routes";
import { investmentTrxRouter } from "./investment-trx-routes";
import { userRouter } from "./user-routes";

const router = Router();

router.get("/", (_request: Request, response: Response) => {
  return response.send({
    message: "Access api through /api endpoint",
  });
});

router.use("/api", authRouter);

router.use(
  "/api/users",
  userRouter,
  expenseRouter,
  accountRouter,
  investmentRouter,
  investmentTrxRouter
);

router.get("/api/health", (_request: Request, response: Response) => {
  return response.send({
    message: "API is up and running",
  });
});

export { router };

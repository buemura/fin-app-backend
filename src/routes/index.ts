import { type Request, type Response, Router } from "express";

import { userRouter } from "./user-routes";
import { expenseRouter } from "./expense-routes";
import { accountRouter } from "./account-routes";
import { investmentRouter } from "./investment-routes";

const router = Router();

router.get("/", (_request: Request, response: Response) => {
  return response.send({
    message: "Access api through /api endpoint",
  });
});

router.use("/api", userRouter, expenseRouter, accountRouter);
router.use("/api/user", investmentRouter);
router.get("/api/health", (_request: Request, response: Response) => {
  return response.send({
    message: "API is up and running",
  });
});

export { router };
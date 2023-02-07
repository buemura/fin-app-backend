import { type Request, type Response, Router } from "express";

import { userRouter } from "./user-routes";
import { expenseRouter } from "./expense-routes";
import { accountRouter } from "./account-routes";

const router = Router();

router.use("/api", userRouter, expenseRouter, accountRouter);

router.get("/api/health", (_request: Request, response: Response) => {
  return response.send({
    message: "API is up and running",
  });
});

export { router };

import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";

import { router } from "../routes";

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://app-fin.vercel.app"],
  })
);
app.use(express.json());
app.use(router);

const server = http.createServer(app);
export { server };

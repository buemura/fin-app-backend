import "dotenv/config";

import cors from "cors";
import express from "express";
import http from "http";

import { router } from "../routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

const server = http.createServer(app);
export { server };

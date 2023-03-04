import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";

import { router } from "@routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
export { server };

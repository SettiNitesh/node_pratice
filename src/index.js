import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import { authRoutes } from "./routes/authRoutes.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use((req, _res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.set("json spaces", 2);

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  logger.info(
    `Server is running on port ${PORT} and access at http://localhost:${PORT}/`
  );
});

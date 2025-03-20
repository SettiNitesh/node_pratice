import express from "express";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./middlewares/logger.js";
import { authRoutes } from "./routes/authRoutes.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { todoRoutes } from "./routes/todoRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// Define __dirname manually in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("json spaces", 2);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, _res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get("/", (_req, res) => {
  res.status(200).send("Hello World");
});

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/search", (req, res) => {
  const { query, page, limit } = req.query;

  if (!query) {
    return res.status(400).json({
      message: "Please provide a search term",
    });
  }

  res.json({
    message: "Search results for '${query}'",
    searchTerm: query,
    page: page || 1,
    limit: limit || 10,
  });
});

app.get("/pug", (_req, res) => {
  res.render("index", { name: "Nitesh" });
});

app.listen(PORT, () => {
  logger.info(
    `Server is running on port ${PORT} and access at http://localhost:${PORT}/`
  );
});

import express from "express";
import { authenticateToken } from "../middlewares/auth.js";

export const dashboardRoutes = express.Router();

dashboardRoutes.get("/", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, User ${req.user.email}!` });
});

import express from "express";
import authController from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

export const authRoutes = express.Router();

authRoutes.post("/register", validate(registerSchema), authController.register);

authRoutes.post("/login", validate(loginSchema), authController.login);

authRoutes.post("/refresh-token", authController.refreshToken);

authRoutes.post("/logout", authController.logOut);

authRoutes.get("/", authController.getAllUsers);

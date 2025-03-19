import express from "express";
import todoController from "../controllers/todoController.js";
import { validate } from "../middlewares/validate.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todoValidation.js";

export const todoRoutes = express.Router();

todoRoutes.get("/", todoController.getAllTodos);

todoRoutes.get("/:id", todoController.getTodoById);

todoRoutes.post("/", validate(createTodoSchema), todoController.createTodo);

todoRoutes.put("/:id", validate(updateTodoSchema), todoController.updateTodo);

todoRoutes.delete("/:id", todoController.deleteTodo);

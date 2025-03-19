import todoService from "../services/todoService.js";

class TodoController {
  async getAllTodos(_req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.status(200).json({
        status: "success",
        data: todos,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
      });
    }
  }

  async getTodoById(req, res) {
    try {
      const { id } = req.params;
      const todo = await todoService.getTodoById(id);
      res.status(200).json({
        status: "success",
        data: todo,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
      });
    }
  }

  async createTodo(req, res) {
    try {
      const newTodo = await todoService.createTodo(req.body);
      res.status(201).json({
        status: "success",
        data: newTodo,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
      });
    }
  }

  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const updatedTodo = await todoService.updateTodo(id, req.body);
      res.status(200).json({
        status: "success",
        data: updatedTodo,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
      });
    }
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      await todoService.deleteTodo(id);
      res.status(200).json({
        status: "success",
        message: "Todo deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message || "Internal server error",
      });
    }
  }
}

export default new TodoController();

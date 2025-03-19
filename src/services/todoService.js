import todoModel from "../models/todoModel.js";

class TodoService {
  async getAllTodos() {
    return await todoModel.findAll();
  }

  async getTodoById(id) {
    const todo = await todoModel.findById(id);
    console.log(todo);

    if (!todo) {
      throw new Error("Todo not found");
    }

    return todo;
  }

  async createTodo(todo) {
    return await todoModel.create(todo);
  }

  async updateTodo(id, data) {
    await this.getTodoById(id);

    return todoModel.update(id, data);
  }

  async deleteTodo(id) {
    await this.getTodoById(id);

    return todoModel.delete(id);
  }
}

export default new TodoService();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TodoModel {
  async findAll() {
    return await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id) {
    return await prisma.todo.findUnique({ where: { uid: id } });
  }

  async create(todo) {
    return await prisma.todo.create({ data: todo });
  }

  async update(id, data) {
    return await prisma.todo.update({ where: { uid: id }, data });
  }

  async delete(id) {
    return await prisma.todo.delete({ where: { uid: id } });
  }
}

export default new TodoModel();

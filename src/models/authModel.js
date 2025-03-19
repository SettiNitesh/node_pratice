import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthModel {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getAll() {
    return await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: {
        uid: id,
      },
    });
  }

  async create(user) {
    return await prisma.user.create({ data: user });
  }

  async update(id, data) {
    return await prisma.user.update({
      where: {
        uid: id,
      },
      data,
    });
  }

  async updateMany(where, data) {
    return await prisma.user.updateMany({
      where: where,
      data,
    });
  }
}

export default new AuthModel();

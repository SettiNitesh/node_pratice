import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: "Title 1",
        userId: "fd7b955d-4de5-413e-8b49-1558bd7b12e7",
        content: "Content 1",
      },
      {
        title: "Title 2",
        userId: "fd7b955d-4de5-413e-8b49-1558bd7b12e7",
        content: "Content 2",
      },
      {
        title: "Title 3",
        userId: "fd7b955d-4de5-413e-8b49-1558bd7b12e7",
      },
    ],
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Title 1",
        userId: "fd7b955d-4de5-413e-8b49-1558bd7b12e7",
        content: "Content 1",
      },
      {
        title: "Title 2",
        userId: "fd7b955d-4de5-413e-8b49-1558bd7b12e7",
        content: "Content 2",
      },
      {
        title: "Title 3",
        userId: "fd7b955d-4de5-413e-8b49-1558bd7b12e7",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

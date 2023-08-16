import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const file1 = await prisma.files.create({
    data: {
      name: 'File test',
      fullPath: 'test.jpg',
    },
  });

  console.log(file1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

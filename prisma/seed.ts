import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.bookmark.deleteMany();
  await prisma.user.deleteMany();

  const users: Prisma.UserCreateInput[] = [
    {
      email: "dan@devhausleipzig.de",
      firstName: "Dan",
      lastName: "McAtee",
      password: "test123",
    },
    {
      email: "taylor@devhausleipzig.de",
      firstName: "Taylor",
      lastName: "Harvey",
      password: "test123",
    },
    {
      email: "franz@devhausleipzig.de",
      firstName: "Franz",
      lastName: "Wollang",
      password: "test123",
    },
    {
      email: "nikita@devhausleipzig.de",
      firstName: "Nikita",
      lastName: "Nakropin",
      password: "test123",
    },
  ];

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({ data: user });
    createdUsers.push(createdUser);
  }

  const bookmarks: Prisma.BookmarkCreateInput[] = [
    {
      movieId: "653346",
      user: { connect: { id: createdUsers[0].id } },
    },
    {
      movieId: "653346",
      user: { connect: { id: createdUsers[2].id } },
    },
    {
      movieId: "653346",
      user: { connect: { id: createdUsers[0].id } }, 
    },
    {
      movieId: "693134",
      user: { connect: { id: createdUsers[1].id } },
    },
    {
      movieId: "693134",
      user: { connect: { id: createdUsers[0].id } },
    },
  ];

  // remove duplicates
  const uniqueBookmarks = bookmarks.filter((bookmark, index, self) =>
    index === self.findIndex((b) => (
      b.user.connect?.id === bookmark.user.connect?.id && b.movieId === bookmark.movieId
    ))
  );

  for (const bookmark of uniqueBookmarks) {
    await prisma.bookmark.create({ data: bookmark });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

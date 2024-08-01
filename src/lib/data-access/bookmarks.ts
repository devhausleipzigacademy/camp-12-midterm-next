import { prisma } from "@/lib/db";

export async function getBookmarks(userId: string) {
  const bookmarksObjects = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
  });
  return bookmarksObjects.map((obj) => obj.movieId);
}

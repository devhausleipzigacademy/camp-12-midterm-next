"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBookmark(userId: string, movieId: string) {
  await prisma.bookmark.delete({
    where: {
      bookmarkByUser: {
        userId,
        movieId,
      },
    },
  });
  revalidatePath(`/movies/${movieId}`);
}

export async function createBookmark(userId: string, movieId: string) {
  await prisma.bookmark.create({
    data: {
      userId,
      movieId,
    },
  });
  revalidatePath(`/movies/${movieId}`);
}

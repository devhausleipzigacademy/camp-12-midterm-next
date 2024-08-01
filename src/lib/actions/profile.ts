"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { UpdateUserInput, updateUserSchema } from "@/lib/validation/profile";

export async function updateProfilePic(userId: string, avatar: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      avatarImage: avatar,
    },
  });
  revalidatePath("/profile");
}

export async function updateUser(id: string, values: UpdateUserInput) {
  // try to find a user

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    // if no nuser exists we throw an error
    if (!existingUser) {
      throw new Error("User doesn't exist");
    }

    // proceed with update if a user exists

    const parsedBody = updateUserSchema.parse(values);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: parsedBody.firstName,
        lastName: parsedBody.lastName,
        email: parsedBody.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: "Validation failed", error: error.issues };
    }
    if (error instanceof Error) {
      return { message: "error.message" };
    }
    return { message: " Failed to update the User" };
  }
  redirect("/");
}

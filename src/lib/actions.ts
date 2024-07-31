"use server";
import z from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

import { LoginValues } from "@/app/(full-page)/login/login-form";
import { UserSchema } from "@/components/customization-form";

export async function login(values: LoginValues) {
  console.log(values);
}

const updateUserSchema = z.object({
  email: z.string().email("Please enter a valid email address").optional(),
  firstName: z
    .string()
    .min(2, "First name is required at least 2 character")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name is required at least 2 character")
    .optional(),
  password: z
    .string()
    .min(6, "Password need to be at least 6 characters long")
    .optional(),
});

export async function updateUser(id: string, values: UserSchema) {
  console.log(id);

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

    const newUser = await prisma.user.update({
      where: { id },
      data: parsedBody,
    });

    revalidatePath("/profile-customization");
    return { message: "User updated successfully!", user: newUser };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: "Validation failed", error: error.issues };
    }
    if (error instanceof Error) {
      return { message: "error.message" };
    }
    return { message: " Failed to update the User" };
  }
}

"use server";

import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import { lucia, validateRequest } from "../auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const signUpSchema = z
  .object({
    email: z.string().email(),
    firstName: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .trim(),
    lastName: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .trim(),
    // Validates if password is at least 10 characters long
    password: z.string().min(6, "Password must be at least 6 characters"),
    // Placeholder for confirm password, validation will be handled in a custom refinement
    confirmPassword: z.string(),
  })
  // Define a custom validation check to ensure password and confirm password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export async function signUp(formData: FormData) {
  const { success, data, error } = signUpSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (error) {
    console.log(error.issues);

    return { error: "Something went wrong" };
  }

  if (success) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const userId = generateIdFromEntropySize(10); // 16 characters long

    // hash the password
    await prisma.user.create({
      data: {
        id: userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  }
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export async function login(formData: FormData) {
  const { data, success, error } = loginSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (error) {
    return { error: "Something went wrong" };
  }
  const exisitingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!exisitingUser) {
    return { error: "User doesn't exist" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(data.password, salt);
  const validPassword = bcrypt.compare(exisitingUser.password, hashed);

  if (!validPassword) {
    return {
      error: "Password invalid",
    };
  }

  const session = await lucia.createSession(exisitingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export async function signOut() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}

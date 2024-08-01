import { z } from "zod";

export const updateUserSchema = z
  .object({
    firstName: z.string().min(2, "Typ in first last name").optional(),
    lastName: z.string().min(2, "Typ in your last name").optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(6, { message: "Password is too short" })
      .max(20, { message: "Password is too long" })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

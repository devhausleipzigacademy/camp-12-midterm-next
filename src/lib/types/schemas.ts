import { z } from "zod";
export const userSchema = z
  .object({
    firstName: z.string().min(2, "Typ in first last name"),
    lastName: z.string().min(2, "Typ in your last name"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default userSchema;

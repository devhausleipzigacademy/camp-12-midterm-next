"use client";

import { login } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z
    .string()
    .min(6, "Your Password needs to be at least 6 characters long"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(values: LoginValues) {
    login(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input className="border" defaultValue="" {...register("email")} />
      {errors.email && <span>This field needs to be a valid email</span>}
      <input className="border" {...register("password")} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" className="bg-slate-800 text-slate-200" />
    </form>
  );
}

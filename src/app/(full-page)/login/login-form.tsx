"use client";
import { KeyIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { login } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginInput } from "./input";
import Button from "@/components/button";

const LoginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Please provide valid password"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(values: LoginValues) {
    try {
      // Handle successful login
      await login(values);
    } catch (error) {
      // Handle login error
      console.error(error, "submit failed");
    }
  }

  return (
    <div className="h-screen bg-dark px-5 py-8">
      <h1 className="text-base font-bold text-white mb-3">
        Welcome to Cine-Scape
      </h1>
      <p className="text-white-dimmed text-sm mb-6">
        You need to log in to be able to make reservations and add movies to
        your watchlist.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
        noValidate
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4 ">
            <LoginInput
              {...register("email")}
              icon={<KeyIcon />}
              placeholder="Enter your email"
              type="email"
              pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
            {errors.email && (
              <span className="text-rose-200">{errors.email.message}</span>
            )}
            <LoginInput
              {...register("password")}
              icon={<LockClosedIcon />}
              placeholder="Enter your password"
              type="password"
              minLength={6}
            />
            {errors.password && (
              <span className="text-rose-200">{errors.password.message}</span>
            )}
            <div className="flex">
              <Button type="submit" children={"Login"} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

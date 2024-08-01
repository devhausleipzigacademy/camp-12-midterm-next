"use client";
import userSchema from "@/lib/types/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Input, Button } from "@headlessui/react";
import { LoginInput as Input } from "@/components/input";
import { Button } from "@/components/button";
import { z } from "zod";
import { User } from "lucia";
import { updateUser } from "@/lib/actions/profile";
import { UpdateUserInput, updateUserSchema } from "@/lib/validation/profile";

export function CustomizationForm({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (data: UpdateUserInput) => {
    console.log("Form submitted with data:", data);
    await updateUser(user.id, data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          className="w-full bg-dark-light text-white p-3 rounded"
          type="text"
          placeholder="Enter your first name"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-rose-600">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <Input
          className="w-full bg-dark-light text-white p-3 rounded"
          type="text"
          placeholder="Enter your last name"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-rose-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <Input
          className="w-full bg-dark-light text-white p-3 rounded"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-rose-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          className="w-full bg-dark-light text-white p-3 rounded"
          type="password"
          placeholder="Change your Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-rose-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Input
          className="w-full bg-dark-light text-white p-3 rounded"
          type="password"
          placeholder="Confirm your Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-rose-600 bg-dark">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* <div className="text-dark-light bg-yellow mt-auto mb-4 rounded-md pt-2 pb-2 text-center"> */}
      <Button type="submit" disabled={isSubmitting}>
        Save Data
      </Button>
      {/* </div> */}
    </form>
  );
}

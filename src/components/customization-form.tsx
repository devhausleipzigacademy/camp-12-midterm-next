"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { LoginInput as Input } from "@/components/input";
import { updateUser } from "@/lib/actions/profile";
import { UpdateUserInput, updateUserSchema } from "@/lib/validation/profile";
import { User } from "lucia";

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
    await updateUser(user.id, data);
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

      <Button type="submit" disabled={isSubmitting}>
        Save Data
      </Button>
    </form>
  );
}

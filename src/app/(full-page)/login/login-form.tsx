"use client";

/* import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"; */
import { LoginInput } from "@/components/login-input";
import { Button } from "@/components/button";
import { KeyIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { login } from "@/lib/actions/auth";

// type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  return (
    <form action={login} className="flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <LoginInput
            name="email"
            icon={<KeyIcon />}
            placeholder="Enter your email"
            inputType="email"
          />
          <LoginInput
            name="password"
            icon={<LockClosedIcon />}
            placeholder="Enter your password"
            inputType="password"
          />
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  );
}

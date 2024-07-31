"use client";

import { Button } from "@/components/button";
import { LoginInput } from "@/components/login-input";
import { signUp } from "@/lib/actions/auth";
import { KeyIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";

export function RegisterForm() {
  return (
    <form action={signUp} className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        <LoginInput
          name="firstName"
          icon={PencilIcon}
          placeholder="First name"
          inputType="text"
        />
        <LoginInput
          name="lastName"
          icon={PencilIcon}
          placeholder="Last name"
          inputType="text"
        />
        <LoginInput
          name="email"
          icon={KeyIcon}
          placeholder="Enter your email"
          inputType="email"
        />
        <LoginInput
          name="password"
          icon={LockClosedIcon}
          placeholder="Enter your password"
          inputType="password"
        />
        <LoginInput
          name="confirmPassword"
          icon={LockClosedIcon}
          placeholder="Confirm your password"
          inputType="password"
        />
      </div>
      <Button type="submit" children="Register" />
    </form>
  );
}

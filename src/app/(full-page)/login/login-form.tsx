"use client";

import { useState } from "react";
import { LoginInput } from "@/components/login-input";
import { Button } from "@/components/button";
import { KeyIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { login } from "@/lib/actions/auth";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message on new submission
    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result && result.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <form
      action={login}
      onSubmit={handleSubmit}
      className="flex flex-col justify-between"
    >
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
          {errorMessage && <span className="text-red">{errorMessage}</span>}
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  );
}

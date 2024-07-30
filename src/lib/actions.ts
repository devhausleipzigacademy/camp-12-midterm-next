"use server";

import { LoginValues } from "@/app/(full-page)/login/login-form";

export async function login(values: LoginValues) {
  console.log(values);
}

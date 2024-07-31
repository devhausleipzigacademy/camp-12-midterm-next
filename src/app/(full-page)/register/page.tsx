import { assertNotAuthenticated } from "@/lib/auth";
import { RegisterForm } from "./register-form";

export default async function RegistrationPage() {
  await assertNotAuthenticated();
  return (
    <div className="h-screen  bg-dark px-5 py-8 flex flex-col">
      <h1 className="text-base font-bold text-white mb-3">
        Welcome to Cine-Scape
      </h1>
      <p className="text-white-dimmed text-sm mb-6">
        You need to register an account to be able to make reservations and add
        movies to your watchlist.
      </p>
      <RegisterForm />
    </div>
  );
}

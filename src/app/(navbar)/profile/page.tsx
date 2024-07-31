import { signOut } from "@/lib/actions/auth";

export default function ProfilePage() {
  return (
    <div>
      <form action={signOut}>
        <button>Logout</button>
      </form>
    </div>
  );
}

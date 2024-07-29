import { prisma } from "@/lib/db";

export default async function HomePage() {
  const users = await prisma.user.findMany();
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

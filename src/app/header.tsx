import Link from "next/link";

export function Header() {
  return (
    <header className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </header>
  );
}

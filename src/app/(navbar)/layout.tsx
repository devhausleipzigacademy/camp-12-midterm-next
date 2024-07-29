import Link from "next/link";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/bookmarks">Bookmarks</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </div>
  );
}

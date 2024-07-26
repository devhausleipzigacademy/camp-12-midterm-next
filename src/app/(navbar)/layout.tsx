export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <nav>Navbar</nav>
    </div>
  );
}

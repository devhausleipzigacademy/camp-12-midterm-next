import { NavBar } from "./nav-bar";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // navigate to login page if no authentifictaion

  return (
    <div className="h-screen flex flex-col bg-dark">
      <div className="flex-1">{children}</div>
      <nav>
        <NavBar />
      </nav>
    </div>
  );
}

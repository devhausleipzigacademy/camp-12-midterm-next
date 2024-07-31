"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export type NavItemProps = {
  route: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export function NavItem({ route, icon: Icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link
      href={route}
      className={isActive ? "text-white" : "text-white-dimmed"}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
}

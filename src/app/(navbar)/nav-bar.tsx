"use client";

import { NavItem } from "./nav-items";
import {
  FilmIcon,
  HomeIcon,
  QueueListIcon,
  UserIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/solid";

const navItems = [
  { icon: HomeIcon, route: "/" },
  { icon: FilmIcon, route: "/movies" },
  { icon: QueueListIcon, route: "/bookmarks" },
  { icon: ArchiveBoxArrowDownIcon, route: "/tickets" },
  { icon: UserIcon, route: "/profile" },
];

export function NavBar() {
  return (
    <div className="bg-dark flex pl-16 pr-16 pt-8 pb-8 gap-6 justify-evenly items-center">
      {navItems.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </div>
  );
}

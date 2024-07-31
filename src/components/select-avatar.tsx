"use client";
import { MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { UserImage } from "@/components/user-image";
import Image from "next/image";
import { useState } from "react";

export function SelectAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [currentAvatar, setCurrentAvatar] = useState<string>(
    "https://devhausleipzig.de/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjulian.b86ca7f2.jpg&w=3840&q=75"
  );

  const avatarOptions = [
    "./src/img/avatar1.svg",
    "./src/img/avatar2.svg",
    "./src/img/avatar3.svg",
    "./src/img/avatar4.svg",
    "./src/img/avatar5.svg",
  ];

  return (
    <>
      <MenuButton>
        <UserImage userName={"Herr Vogel"} userImage={currentAvatar} />
      </MenuButton>
      <MenuItems className="absolute right-1 mt-2 w-72 origin-top-right bg-dark border border-white-dimmed-heavy divide-y divide-white-dimmed-heavy rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="flex gap-2 p-2">
          {avatarOptions.map((avatar, index) => (
            <MenuItem key={index}>
              {/* just for now again */}
              {({ active }: any) => (
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`cursor-pointer ${
                    active ? "ring-2  gap-1 ring-yellow rounded-full" : ""
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setSelectedAvatar(avatar);
                  }}
                />
              )}
            </MenuItem>
          ))}
        </div>
        <MenuItem>
          {/* just for now type any, ask dan later */}
          {({ active }: any) => (
            <button
              className={`${
                active ? "bg-dark-light" : ""
              } group flex w-full items-center px-4 py-2 text-sm text-white`}
              onClick={() => setCurrentAvatar(selectedAvatar)}
            >
              Save
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </>
  );
}

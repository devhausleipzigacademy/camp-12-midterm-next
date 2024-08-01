"use client";
import { MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { UserImage } from "@/components/user-image";
import { useState } from "react";
import { updateProfilePic } from "@/lib/actions/profile";
import { User } from "lucia";

type Props = {
  user: User;
};

export function SelectAvatar({ user }: Props) {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const avatarOptions = [
    "/avatar1.svg",
    "/avatar2.svg",
    "/avatar3.svg",
    "/avatar4.svg",
    "/avatar5.svg",
  ];

  return (
    <>
      <MenuButton>
        <UserImage userName={"Herr Vogel"} userImage={user.avatarImage ?? ""} />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="w-72 origin-top-right bg-dark border border-white-dimmed-heavy divide-y divide-white-dimmed-heavy rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="flex justify-between p-2">
          {avatarOptions.map((avatar, index) => (
            <MenuItem key={index}>
              {/* just for now again */}
              {({ active }: any) => (
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`cursor-pointer size-10 ${
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
              onClick={async () => {
                await updateProfilePic(user.id, selectedAvatar);
              }}
            >
              Save
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </>
  );
}

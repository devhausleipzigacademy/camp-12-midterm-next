import { Menu } from "@headlessui/react";
import Link from "next/link";
import { CustomizationForm } from "@/components/customization-form";
import { SelectAvatar } from "@/components/select-avatar";
import { protectPage } from "@/lib/auth";

export default async function ProfileCustomization() {
  const user = await protectPage();

  return (
    <div className="bg-dark h-full text-white flex flex-col">
      <header className="p-4 flex justify-between items-center ml-4 mr-1 mt-5">
        <Link href="/">
          <svg
            className="h-6 w-6"
            viewBox="0 0 16 16"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.14671 8.35335C5.05308 8.2596 5.00049 8.13252 5.00049 8.00002C5.00049 7.86752 5.05308 7.74044 5.14671 7.64669L10.1467 2.64669C10.1925 2.59756 10.2477 2.55816 10.309 2.53083C10.3704 2.50351 10.4366 2.48881 10.5037 2.48763C10.5708 2.48644 10.6375 2.49879 10.6998 2.52394C10.762 2.54909 10.8186 2.58652 10.8661 2.634C10.9136 2.68147 10.951 2.73803 10.9761 2.80029C11.0013 2.86255 11.0136 2.92923 11.0124 2.99637C11.0113 3.0635 10.9966 3.12971 10.9692 3.19105C10.9419 3.25238 10.9025 3.30758 10.8534 3.35335L6.20672 8.00002L10.8534 12.6467C10.9025 12.6925 10.9419 12.7477 10.9692 12.809C10.9966 12.8703 11.0113 12.9365 11.0124 13.0037C11.0136 13.0708 11.0013 13.1375 10.9761 13.1998C10.951 13.262 10.9136 13.3186 10.8661 13.366C10.8186 13.4135 10.762 13.451 10.6998 13.4761C10.6375 13.5013 10.5708 13.5136 10.5037 13.5124C10.4366 13.5112 10.3704 13.4965 10.309 13.4692C10.2477 13.4419 10.1925 13.4025 10.1467 13.3534L5.14671 8.35335Z" />
          </svg>
        </Link>

        <Menu>
          <SelectAvatar user={user} />
        </Menu>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Profile Customization</h1>
        <CustomizationForm user={user} />
      </main>
    </div>
  );
}

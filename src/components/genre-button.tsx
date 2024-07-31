<<<<<<< HEAD
import React from "react";
import { Genre, genreEmojis } from "../lib/utils";

type Props = {
  genre: Genre;
  selected: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GenreButton({ genre, selected, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        {...rest}
        className={`text-3xl rounded-xl flex items-center justify-center
                    w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18
                    ${selected ? "bg-white-dimmed" : "bg-dark-light"}`}
      >
        {genreEmojis[genre as Genre]}
      </button>
      <span className="text-white-dimmed font-bold text-xs truncate w-full text-center">
        {genre}
=======
"use client";

import { Genre, genreEmojis } from "@/lib/genre";
import { GenreType } from "@/lib/types/movie";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  genre: GenreType;
  selected: boolean;
};

export function GenreButton({ genre, selected, ...rest }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        onClick={async () => {
          const existingGenres = searchParams.getAll("genre");
          if (existingGenres.includes(genre.id.toString())) {
            const newParams = existingGenres
              .filter((g) => g !== genre.id.toString())
              .map((g) => `genre=${g}`)
              .join("&");
            console.log(newParams);

            router.replace(`/?${newParams}`);
          } else {
            const newParams = existingGenres.map((g) => `genre=${g}`).join("&");
            router.replace(`/?genre=${genre.id}&${newParams}`);
          }
        }}
        className={cn(
          "text-3xl rounded-xl flex items-center justify-center",
          "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18", // Responsive sizes
          selected ? "bg-white-dimmed" : "bg-dark-light"
        )}
      >
        {genreEmojis[genre.name as Genre]}
      </button>
      <span className="text-white-dimmed font-bold text-xs truncate w-full text-center">
        {genre.name}
>>>>>>> 6681dba4ef61068a6f04d8b953e285010332bf87
      </span>
    </div>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getPosterImage(url: string) {
  return `https://image.tmdb.org/t/p/w500/${url}`;
}

<<<<<<< HEAD
export const knownGenres = [
  "Romance",
  "Crime",
  "History",
  "Action",
  "Documentary",
  "Horror",
  "Adventure",
  "Drama",
  "Music",
  "Animation",
  "Family",
  "Mystery",
  "Comedy",
  "Fantasy",
  "Science-Fiction",
  "Thriller",
] as const;

export type KnownGenre = (typeof knownGenres)[number];
export type Genre = KnownGenre | string;

export const genreEmojis: Record<Genre, string> = {
  Romance: "😍",
  Crime: "🚔",
  History: "⏳",
  Action: "🧨",
  Documentary: "🎥",
  Horror: "🔪",
  Adventure: "💎",
  Drama: "🎭",
  Music: "🎧",
  Animation: "🦁",
  Family: "👪",
  Mystery: "🔎",
  Comedy: "🤣",
  Fantasy: "🦄",
  "Science-Fiction": "👽",
  Thriller: "😱",
} as const;
=======
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
>>>>>>> 6681dba4ef61068a6f04d8b953e285010332bf87

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getPosterImage(url: string) {
  return `https://image.tmdb.org/t/p/w500/${url}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

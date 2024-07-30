export function getPosterImage(url: string) {
  return `https://image.tmdb.org/t/p/w500/${url}`;
}

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

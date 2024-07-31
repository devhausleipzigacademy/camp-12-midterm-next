import "server-only";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: any;
  title: any;
  backdrop_path: any;
  poster_path: any;
  overview: any;
  details: any;
}

export async function getMovieDetails(movieId: string): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie = await response.json();
  return {
    id: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    poster_path: movie.poster_path,
    overview: movie.overview,
    details: movie.details,
  };
}

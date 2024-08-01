import axios from "axios";
import { Movie, MovieCredit, MovieDetail } from "../types/movie";

export async function getMovieDetails(movieId: string) {
  const details = await axios
    .get<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
      },
    })
    .then((res) => res.data);
  return details;
}

export async function getMovieCredits(movieId: string) {
  const credits = await axios
    .get<MovieCredit>(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
      },
    })
    .then((res) => res.data);
  return credits;
}

export async function getMovieById(movieId: string) {
  return axios
    .get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    })
    .then((res) => res.data);
}

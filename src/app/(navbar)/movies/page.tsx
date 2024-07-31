import { Movie, MovieResponse } from "@/lib/types/movie";
import { getPosterImage } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

export default async function MoviesPage() {
  const movies = await axios
    .get<MovieResponse>("https://api.themoviedb.org/3/movie/now_playing", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        page: 1,
        region: "DE",
      },
    })
    .then((res) => res.data.results);
  console.log(movies);

  // .then((res) => res.data.results);

  return <div className="grid grid-cols-3 gap-4"></div>;
}

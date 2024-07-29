import { MovieDetail } from "@/lib/types/movie";
import { getPosterImage } from "@/lib/utils";
import axios from "axios";

export default async function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  const { data: movie } = await axios.get<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${params.movieId}`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
      },
    }
  );
  return (
    <div>
      <img src={getPosterImage(movie.poster_path)} alt={movie.title} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}

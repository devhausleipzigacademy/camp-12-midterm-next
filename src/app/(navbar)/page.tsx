import { GenreButton } from "@/components/genre-button";
import { MovieCard } from "@/components/movie-card";
import { SectionTitle } from "@/components/section-title";
import { protectPage } from "@/lib/auth";
import { GenreType, MovieResponse } from "@/lib/types/movie";
import axios from "axios";
import { HomepageHeader } from "./header";
import { Search } from "./search";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { genre: string | string[] };
}) {
  const user = await protectPage();

  const selectedGenres = Array.isArray(searchParams.genre)
    ? searchParams.genre
    : [searchParams.genre];

  const genres = await axios
    .get<{
      genres: GenreType[];
    }>("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
        page: 1,
        region: "DE",
      },
    })
    .then((res) => res.data.genres);

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

  const filteredMovies = movies.filter((movie) => {
    if (selectedGenres[0] === undefined) {
      return true;
    } else {
      return selectedGenres.some((g) => movie.genre_ids.includes(parseInt(g)));
    }
  });

  return (
    <div className="bg-dark overflow-hidden pt-8">
      <div className="px-5 mb-4 flex flex-col gap-6">
        <HomepageHeader
          firstName={user.firstName}
          userImage={user.avatarImage ?? ""}
        />
        <Search movies={movies} />
        <div className="flex flex-col gap-4">
          <SectionTitle text={"Genre"} ShowSeeAll={true} route="/genres" />
          <div className="flex justify-between text-white">
            {genres.slice(0, 4).map((genre) => (
              <GenreButton
                key={genre.id}
                genre={genre}
                // TODO: make this interactive again
              />
            ))}
          </div>
        </div>
        <SectionTitle text={"Upcoming Movies"} />
      </div>
      <div className="flex gap-6 overflow-y-hidden scrollbar-hide snap-x h-56 mx-4 text-white">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}

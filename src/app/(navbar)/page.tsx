import { GenreType, MovieResponse } from "@/lib/types/movie";
import axios from "axios";
import { HomepageHeader } from "./header";
import { SectionTitle } from "@/components/section-title";
import { GenreButton } from "@/components/genre-button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { protectPage, validateRequest } from "@/lib/auth";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { genre: string | string[] };
}) {
  await protectPage();

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
          userName={"Herr Vogel"}
          userImage={
            "https://devhausleipzig.de/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjulian.b86ca7f2.jpg&w=3840&q=75"
          }
        />
        {/* <ComboSearchBox placeholder={"Search"} /> */}
        <div className="flex flex-col gap-4">
          <SectionTitle text={"Genre"} ShowSeeAll={true} route="/genres" />
          <div className="flex justify-between text-white">
            {genres.slice(0, 4).map((genre) => (
              <GenreButton
                key={genre.id}
                genre={genre}
                // TODO: make this interactive again
                selected={false}
                // onClick={() => handleClick(genre.name)}
              />
            ))}
          </div>
        </div>
        <SectionTitle text={"Upcoming Movies"} />
      </div>
      <div className="flex gap-6 overflow-y-hidden scrollbar-hide snap-x h-56 mx-4 text-white">
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="rounded-md snap-center flex-shrink-0 w-36"
          >
            <img
              key={movie.id}
              className="h-full w-full"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

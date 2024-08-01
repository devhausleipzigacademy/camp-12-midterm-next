import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Movie, MovieResponse } from "@/lib/types/movie";
import { MovieCard } from "@/components/movie-card";
import { PageButton } from "@/components/page-button";
import axios from "axios";

// Server component to fetch movie data
const fetchMovies = async (): Promise<MovieResponse | null> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
    // return [];
  }
};

// Movies overview page component
const Movies = async ({ searchParams }: { searchParams: { page: string } }) => {
  // Fetch movies on the server side
  const movies = await fetchMovies();
  console.log(movies);

  const { page } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  // Calculate the index range for the current page
  const moviesPerPage = 4;
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  if (!movies) return <p>Error loading movies</p>;

  // Slice the movies array to get only the movies for the current page
  const paginatedMovies = movies.results.slice(startIndex, endIndex);

  // Determine the total number of pages
  const totalPages = Math.ceil(movies.results.length / moviesPerPage);

  return (
    <div className="flex flex-col items-center bg-dark pt-8 px-5">
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {paginatedMovies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            year={movie.release_date.split("-")[0]}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </div>
      <div className="flex justify-between w-full max-w-2xl mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link href={`/movies?page=${index + 1}`} key={index + 1}>
            <PageButton page={index + 1} active={currentPage === index + 1} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;

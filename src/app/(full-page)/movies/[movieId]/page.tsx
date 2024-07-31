import { useState } from "react";
import { GetServerSideProps } from "next";
import { Movie } from "../../../../lib/types/movie";
import { MovieCard } from "../../../../components/movie-card";
import { PageButton } from "../../../../components/page-button";
import axios from "axios";

interface MoviesProps {
  movies: Movie[];
}

const Movies = ({ movies }: MoviesProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the index range for the current page
  const moviesPerPage = 4;
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  // Slice the movies array to get only the movies for the current page
  const paginatedMovies = movies.slice(startIndex, endIndex);

  // Determine the total number of pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

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
          <PageButton
            key={index + 1}
            page={index + 1}
            active={currentPage === index + 1}
            onClick={() => handlePageSelect(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get("https://api.example.com/movies"); // Replace with your API endpoint
    const movies: Movie[] = response.data;

    return {
      props: {
        movies,
      },
    };
  } catch (error) {
    return {
      props: {
        movies: [],
      },
    };
  }
};

export default Movies;

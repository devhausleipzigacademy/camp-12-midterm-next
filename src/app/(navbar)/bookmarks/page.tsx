/*
 Create a new page
 Import the necessary components
 Follow the design on Figma
 Display bookmarked movies (use dummy data for now).
 */
import React, { useState } from "react";
import { PageButton } from "@/components/page-button";
import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/lib/types/movie";
import axios from "axios";
import { getBookmarks } from "@/lib/data-access/bookmarks";
import { protectPage } from "@/lib/auth";
import { getMovieById } from "@/lib/data-access/movies";
import Link from "next/link";

const BookmarkedMovies = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  //const [activePage, setActivePage] = useState<number>(1);
  const user = await protectPage();
  const bookmarks = await getBookmarks(user.id);
  const movieRequests = bookmarks.map((movieId) => getMovieById(movieId));
  const movies = await Promise.all(movieRequests);
  //const handlePageSelect = (page: number) => {
  // setActivePage(page);
  // };

  if (movies.length === 0) {
    return (
      <div className="flex flex-col justify-center text-white-dimmed text-center text-2xl gap-4 h-full">
        <p>You have no bookmarks yet.</p>
        <a
          className="underline underline-offset-4 tesxt-white-dimmed"
          href="/movies"
        >
          Go to movies
        </a>
      </div>
    );
  }

  // const storedMovies = JSON.parse(localStorage.Movies);
  // console.log(storedMovies);

  // Calculate the index range for the current page
  const { page } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const moviesPerPage = 4;
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  // slice movies array to display only 4 per page
  const paginatedMovies = movies.slice(startIndex, endIndex);

  // Determine the total number of pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div
      id="whole-div"
      className="flex flex-col bg-dark px-5 pt-8 h-full justify-between"
    >
      <div className="grid grid-cols-2 gap-5">
        {paginatedMovies.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
          />
        ))}
      </div>
      <div id="button-div" className="flex justify-center gap-4 mt-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link href={`/bookmarks?page=${index + 1}`} key={index + 1}>
            <PageButton page={index + 1} active={currentPage === index + 1} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedMovies;

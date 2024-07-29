/*
 Create a new page
 Import the necessary components
 Follow the design on Figma
 Display bookmarked movies (use dummy data for now).
 */
 import React, { useState } from "react";
 import { PageButton } from "../components/page-button";
 import { useGetMoviesById } from "../hooks/useGetMoviesById";
 import { MovieCard } from "../components/movie-card";
 import { Movie } from "../types/movie";
 
 export default const BookmarkedMovies: React.FC = () => {
   const [activePage, setActivePage] = useState<number>(1);
 
   const { movies, isLoading, isError } = useGetMoviesById();
 
   const handlePageSelect = (page: number) => {
     setActivePage(page);
   };
 
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
 
   if (isLoading) {
     return <div>Loading...</div>;
   }
 
   if (isError) {
     return <div>Error loading movies</div>;
   }
 
   // const storedMovies = JSON.parse(localStorage.Movies);
   // console.log(storedMovies);
 
   // Calculate the index range for the current page
   const moviesPerPage = 4;
   const startIndex = (activePage - 1) * moviesPerPage;
   const endIndex = startIndex + moviesPerPage;
 
   // slice movies array to display only 4 per page
   const paginatedMovies = movies?.slice(startIndex, endIndex) || [];
 
   // determine number of total pages
   const totalPages = Math.ceil((movies?.length || 0) / moviesPerPage);
 
   return (
     <div
       id="whole-div"
       className="flex flex-col bg-dark px-5 pt-8 h-full justify-between"
     >
       <div className="grid grid-cols-2 gap-5">
         {paginatedMovies.map((movie: Movie) => (
           <MovieCard
             key={movie.id}
             year={movie.release_date.split("-")[0]}
             title={movie.title}
             poster={movie.poster_path}
           />
         ))}
       </div>
       <div id="button-div" className="flex justify-center gap-4 mt-5">
         {Array.from({ length: totalPages }, (_, index) => (
           <div className="flex flex-end">
             <PageButton
               key={index + 1}
               page={index + 1}
               active={activePage === index + 1}
               onClick={() => handlePageSelect(index + 1)}
             />
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 
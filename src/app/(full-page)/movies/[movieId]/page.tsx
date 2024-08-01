import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { HeartIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { MovieCredit, MovieDetail } from "@/lib/types/movie";
import { BackButton } from "@/components/back-button";
import { protectPage } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getBookmarks } from "@/lib/data-access/bookmarks";
import { getMovieCredits, getMovieDetails } from "@/lib/data-access/movies";
import Link from "next/link";
import { Synopsis } from "./synopsis";
import { BookmarkButton } from "./bookmark-button";

export default async function MovieDetails({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;
  const user = await protectPage();
  const bookmarks = await getBookmarks(user.id);
  const details = await getMovieDetails(movieId);
  const credits = await getMovieCredits(movieId);

  const userRating = details.vote_average * 10;
  const ratingColorClass =
    userRating < 50
      ? "text-red"
      : userRating <= 75
      ? "text-orange-500"
      : "text-green";

  // see the actual data entries from tmdb

  return (
    <section className="flex flex-col h-full min-h-screen bg-dark px-4 overflow-x-hidden">
      <div className="flex-grow text-white">
        <div className="flex flex-row justify-between my-2 h-16 items-center">
          {/* link back to movies */}
          <BackButton />

          <h1 className="text-white text-base font-bold">Movie Detail</h1>
          <BookmarkButton
            movieId={movieId}
            bookmarks={bookmarks}
            userId={user.id}
          />
        </div>
        <div
          className={`h-52 bg-orange-300 rounded-lg mb-4 w-full max-h-full max-w-full bg-cover bg-no-repeat bg-center`}
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w500/${details.backdrop_path}')`,
          }}
        ></div>
        <h1 className="text-xl font-bold pb-3">{details.title}</h1>
        <ul className="flex flex-row gap-4 pb-3 text-xs">
          <li className="text-white">{details.release_date.split("-")[0]}</li>
          <li className="text-white-dimmed">
            {details.genres
              .map((e: { id: number; name: string }) => e.name)
              .join(" / ")}
          </li>
          <li className="text-white-dimmed">
            {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
          </li>
          <li className={`ml-auto ${ratingColorClass}`}>
            {userRating.toPrecision(2)}%
            <span className="text-white-dimmed">&nbsp;Score</span>
          </li>
        </ul>
        <div className="grid grid-flow-col-dense grid-cols-5 gap-x-2 text-xs auto-cols-fr">
          <span className="text-white-dimmed pb-2">Director:&nbsp;</span>
          <span className="text-white-dimmed">Writer:&nbsp;</span>
          <div className="col-span-2">
            {credits?.crew
              .filter((e) => e.job === "Director")
              .map((e: { id: number; name: string }) => (
                <p key={e.id}>{e.name} </p>
              ))}
          </div>
          <div className="col-span-2">
            {credits?.crew
              .filter((e) => e.job === "Writer")
              .map((e: { id: number; name: string }) => (
                <p key={e.id}>{e.name} </p>
              ))
              .slice(0, 1)}
          </div>
          <Link
            href={`/movies/${movieId}/cast`}
            className="bg-white-dimmed-heavy col-span-2 row-span-2 rounded-md max-h-10 h-full self-center flex items-center justify-center"
          >
            Cast & Crew
          </Link>
        </div>
        <hr className="h-px my-4 border-0 bg-white-dimmed" />
        <h2 className="text-sm pb-3">Synopsis</h2>
        <Synopsis overview={details.overview} />
      </div>
      <div className="text-dark-light mt-auto mb-4">
        <Link
          href={`/movies/${movieId}/time`}
          className="bg-yellow disabled:bg-yellow/50 py-4 block rounded-lg font-semibold text-center"
        >
          Get Reservation
        </Link>
      </div>
    </section>
  );
}

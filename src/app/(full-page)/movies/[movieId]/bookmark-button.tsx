"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function BookmarkButton({ params }: { params: { movieId: string } }) {
  const [toggleHeart, setToggleHeart] = useState(false);
  const [currentId, setCurrentId] = useState<string[]>([]);
  useEffect(() => {
    localStorage.setItem("Movies", JSON.stringify(currentId));
  }, [currentId]);

  const handleClick = (movieId: string) => {
    setToggleHeart(!toggleHeart);
    setCurrentId((prevSelectedId) => {
      if (prevSelectedId.includes(movieId)) {
        return prevSelectedId.filter((i) => i !== movieId);
      } else {
        return [...prevSelectedId, movieId];
      }
    });
  };

  return (
    <button
      onClick={() => {
        if (!params.movieId) return;
        handleClick(params.movieId);
      }}
    >
      <HeartIcon
        className={`size-6 text-red ${
          currentId.includes(params.movieId || "") ? "fill-red" : "fill-none"
        } `}
      />
    </button>
  );
}

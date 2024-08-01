"use client";
import { createBookmark, deleteBookmark } from "@/lib/actions/bookmarks";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@heroicons/react/24/outline";

type Props = {
  movieId: string;
  userId: string;
  bookmarks: string[];
};

export function BookmarkButton({ movieId, bookmarks, userId }: Props) {
  const handleClick = async () => {
    if (bookmarks.includes(movieId)) {
      await deleteBookmark(userId, movieId);
    } else {
      await createBookmark(userId, movieId);
    }
  };

  return (
    <button onClick={handleClick}>
      <HeartIcon
        className={cn(
          "size-6 text-red",
          bookmarks.includes(movieId) ? "fill-red" : "fill-none"
        )}
      />
    </button>
  );
}

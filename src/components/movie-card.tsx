import Link from "next/link";

type Props = {
  title: string;
  id: string;
  poster: string;
};

export function MovieCard({ title, id, poster }: Props) {
  return (
    <Link
      href={`/movies/${id}`}
      className="rounded-md snap-center flex-shrink-0 w-36"
    >
      <img
        key={id}
        className="h-full w-full"
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
      />
    </Link>
  );
}

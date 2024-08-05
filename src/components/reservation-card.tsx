import Link from "next/link";

type Props = {
  title: string;
  id: string;
  poster: string;
  time: string;
};

export function ReservationCard({ title, id, poster, time }: Props) {
  return (
    <Link
      href={`/movies/${id}`}
      className="rounded-md snap-center"
    >
      <div className="flex">
        <div className="w-1/3">
          <img
            key={id}
            className="h-full w-full"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm font-light">{time}</p>
        </div>
      </div>
    </Link>
  );
}

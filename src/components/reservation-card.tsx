import Link from "next/link";

type Props = {
  title: string;
  id: string;
  poster: string;
  time: string;
  date: string;
  bookedSeats: number;
  href: string
};

export function ReservationCard({ title, id, poster, time , date, bookedSeats, href}: Props) {

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <Link
      href={href}
      className="rounded-lg snap-center bg-dark-light"
    >
      <div className="flex h-26">
        <div className="w-1/3">
          <img
            key={id}
            className="h-full w-full rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-center text-white">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm font-light">{formattedDate}</p>
          <p className="text-sm font-light">{time}</p>
          <p className="text-sm font-light">Number of booked seats: {bookedSeats}</p>
        </div>
      </div>
    </Link>
  );
}

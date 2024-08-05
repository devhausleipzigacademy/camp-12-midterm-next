import { protectPage } from "@/lib/auth";
import { getReservations } from "@/lib/data-access/reservations";
import { getMovieById } from "@/lib/data-access/movies";
import { ReservationCard } from "@/components/reservation-card";
import Link from "next/link";
import { PageButton } from "@/components/page-button";

export default async function MyTickets({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const user = await protectPage();
  const reservations = await getReservations(user.id);
  const reservationsMutable = reservations as any;

  for (const reservation of reservationsMutable) {
    const movieId = reservation.screening.movieId;
    reservation.screening.movie = await getMovieById(movieId);
  }

  // pagination stuff
  const { page } = searchParams;
  const currentPage = page ? parseInt(page) : 1;
  const reservationsPerPage = 3;

  const startIndex = (currentPage - 1) * reservationsPerPage;
  const endIndex = startIndex + reservationsPerPage;
  const paginatedReservations = reservationsMutable.slice(startIndex, endIndex);
  const totalPages = Math.ceil(
    reservationsMutable.length / reservationsPerPage
  );

  console.log("Loaded reservations");
  return (
    <div
      id="whole-div"
      className="flex flex-col bg-dark px-5 pt-8 h-full justify-between"
    >
      <div className="grid grid-cols-1 gap-4">
        {paginatedReservations.map((reservation: any) => (
          <ReservationCard
            key={reservation.id}
            title={reservation.screening.movie.original_title}
            id={reservation.screening.movie.id}
            poster={reservation.screening.movie.poster_path}
            time={reservation.screening.time}
            date={reservation.screening.date}
            bookedSeats={reservation.bookedSeats.length}
            href={`/movies/${reservation.screening.movie.id}/${reservation.screening.id}/${reservation.id}/ticket`}
          />
        ))}
      </div>
      <div className="flex justify-around w-full max-w-2xl mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link href={`/tickets?page=${index + 1}`} key={index + 1}>
            <PageButton page={index + 1} active={currentPage === index + 1} />
          </Link>
        ))}
      </div>
    </div>
  );
}

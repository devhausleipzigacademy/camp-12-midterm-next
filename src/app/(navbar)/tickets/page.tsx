import { protectPage } from "@/lib/auth";
import { getReservations } from "@/lib/data-access/reservations";
import { getMovieById } from "@/lib/data-access/movies";
import { ReservationCard } from "@/components/reservation-card";

const MyTickets = async () => {
  const user = await protectPage();
  const reservations = await getReservations(user.id);
  const reservationsCopy = reservations as any;

  for (const reservation of reservationsCopy) {
    const movieId = reservation.screening.movieId;
    reservation.screening.movie = await getMovieById(movieId);
  }

  console.log("Loaded reservations");
  return (
    <div
      id="whole-div"
      className="flex flex-col bg-dark px-5 pt-8 h-full justify-between"
    >
      <div className="grid grid-cols-1 gap-4">
        {reservationsCopy.map((reservation: any) => (
            <ReservationCard
              key={reservation.id}
              title={reservation.screening.movie.original_title}
              id={reservation.screening.movie.id}
              poster={reservation.screening.movie.poster_path}
              time={reservation.screening.time}
              date={reservation.screening.date}
              bookedSeats={reservation.bookedSeats.length}
              href={`/movies/${reservation.screening.movie.id}/${reservation.screening.id}/${reservation.id}/ticket`}
            />))}
      </div>
    </div>
  );
};

export default MyTickets;
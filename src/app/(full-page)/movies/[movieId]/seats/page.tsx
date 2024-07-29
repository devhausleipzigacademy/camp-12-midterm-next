export default function BookingSeatsPage({
  params,
}: {
  params: { movieId: string };
}) {
  return (
    <div>
      <span>Booking Seats - {params.movieId}</span>
    </div>
  );
}

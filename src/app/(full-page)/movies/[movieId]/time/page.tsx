export default function BookingTimePage({
  params,
}: {
  params: { movieId: string };
}) {
  return (
    <div>
      <span>Booking Time - {params.movieId}</span>
    </div>
  );
}

export default function TicketPage({
  params,
}: {
  params: { movieId: string };
}) {
  return (
    <div>
      <span>Ticket - {params.movieId}</span>
    </div>
  );
}

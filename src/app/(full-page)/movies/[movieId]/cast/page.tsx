export default function CastAndCrewPage({
  params,
}: {
  params: { movieId: string };
}) {
  return (
    <div>
      <span>Cast & Crew - {params.movieId}</span>
    </div>
  );
}

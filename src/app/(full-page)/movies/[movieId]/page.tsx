export default function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  return (
    <div>
      <span>Movie Details - {params.movieId}</span>
    </div>
  );
}

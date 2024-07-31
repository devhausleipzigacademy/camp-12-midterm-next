type Props = {
  title: string;
  year: string;
  poster: string;
};

export function MovieCard({ title, year, poster }: Props) {
  return (
    <div className="relative group w-full pb-[150%] overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 text-center bg-dark bg-opacity-70 flex flex-col items-center justify-around text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm">{year}</p>
      </div>
    </div>
  );
}

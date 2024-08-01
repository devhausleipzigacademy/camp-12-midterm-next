<<<<<<< HEAD
import Image from "next/image";

=======
>>>>>>> 6681dba4ef61068a6f04d8b953e285010332bf87
type Props = {
  title: string;
  year: string;
  poster: string;
};

export function MovieCard({ title, year, poster }: Props) {
  return (
    <div className="relative group w-full pb-[150%] overflow-hidden">
<<<<<<< HEAD
      <Image
=======
      <img
>>>>>>> 6681dba4ef61068a6f04d8b953e285010332bf87
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

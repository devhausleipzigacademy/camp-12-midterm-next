import { Button } from "@/components/button";
import Link from "next/link";
import axios from "axios";
import { TicketBarcode } from "./barcode";

export default async function TicketPage({
  params,
}: {
  params: { movieId: string };
}) {
  // const movie = await getMovieDetails(params.movieId);

  const movie = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    )
    .then((res) => res.data);
  console.log(movie);

  const totalPrice = 14.99;

  const selectedSeats = ["A1", "A2", "A3"];
  const date = "2024-03-01";
  const time = "12:00 PM";

  const imageUrl =
    movie && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : "https://www.zooplus.de/magazin/wp-content/uploads/2022/03/pallas-katze-auf-felsen-1024x683.jpg";
  return (
    <section className="bg-dark min-h-screen flex flex-col justify-center items-stretch p-4 overflow-x-hidden">
      <div className="bg-dark-light rounded-xl flex flex-col flex-grow text-white mb-4 bg-center">
        <div className="h-96">
          <div
            className={`h-3/4 w-auto bg-cover bg-no-repeat p-8 rounded-t-xl`}
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          ></div>
          <div className="px-6 pb-2">
            <h1 className="text-2xl font-bold mb-4 mt-2">{movie?.title}</h1>
            <div className="flex flex-row gap-8 gap-y-4 flex-wrap justify-between ">
              <div className="flex flex-col">
                <h3 className="text-dark text-sm">Date</h3>
                <h2 className="text-m font-semibold">{date || "N/A"}</h2>
              </div>
              <div className="flex flex-col">
                <h3 className="text-dark text-sm">Time</h3>
                <h2 className="text-m font-semibold">{time || "N/A"}</h2>
              </div>
              <div className="flex flex-col">
                <h3 className="text-dark text-sm">Price</h3>
                <h2 className="text-m font-semibold">${totalPrice}</h2>
              </div>
              <div className="flex flex-col">
                <h3 className="text-dark text-sm">Seats</h3>
                <h2 className="text-m font-semibold">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "N/A"}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-stretch items-center -mx-6">
          <div className="bg-dark h-12 w-12 rounded-full aspect-square "></div>
          <div className="border-2 h-0 border-white border-dashed flex-grow"></div>
          <div className="bg-dark h-12 w-12 rounded-full "></div>
        </div>

        <div className="px-12 flex justify-center my-auto">
          <TicketBarcode movieId={params.movieId} />
        </div>
      </div>

      <Button variant="primary" size="default">
        <Link href="/">Back to Home</Link>
      </Button>
    </section>
  );
}

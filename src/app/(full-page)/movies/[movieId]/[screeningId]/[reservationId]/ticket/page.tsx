import { Button } from "@/components/button";
import { getMovieById } from "@/lib/data-access/movies";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import Link from "next/link";
import { TicketBarcode } from "./barcode";
import { protectPage } from "@/lib/auth";

export default async function TicketPage({
  params,
}: {
  params: { movieId: string; screeningId: string; reservationId: string };
}) {
  const user = await protectPage();
  const movie = await getMovieById(params.movieId);

  const reservation = await prisma.reservation.findUnique({
    where: { id: params.reservationId },
  });

  const screening = await prisma.screening.findUnique({
    where: { id: params.screeningId },
  });

  if (!reservation || !screening) {
    return <p>Something went wrong</p>;
  }

  const prices: Record<"front" | "middle" | "back", number> = {
    front: 12.99,
    middle: 14.99,
    back: 16.99,
  };

  const totalPrice = reservation.bookedSeats.reduce((acc, seat) => {
    if (seat[0] === "A") {
      return (acc += prices.front);
    } else if (seat[0] === "F") {
      return (acc += prices.back);
    } else {
      return (acc += prices.middle);
    }
  }, 0);

  const selectedSeats = reservation.bookedSeats;
  const date = format(screening.date, "dd-MM-yyyy");
  const time = screening.time;

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
            <h1 className="text-2xl font-bold mb-2 mt-2">{movie?.title}</h1>
            <p>Enjoy the movie {user.firstName}</p>
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

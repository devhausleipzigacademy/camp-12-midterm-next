import Link from "next/link";
import SelectSeats from "@/components/select-seats";
import { prisma } from "@/lib/db";
import { generateSeats } from "@/lib/seats";
import { GetBookingInfo } from "@/components/get-booking-info";
import { protectPage } from "@/lib/auth";
import { getSnacks } from "@/lib/data-access/snacks";

export default async function ReservationPage({
  params,
}: {
  params: {
    movieId: string;
    screeningId: string;
  };
}) {
  const movieId = params.movieId;
  const user = await protectPage();

  const nothing = await getSnacks();

  const screening = await prisma.screening.findUnique({
    where: { id: params.screeningId },
    include: {
      reservations: true,
    },
  });

  // flatMap() is is map but flattens two arrays into one -
  // [A1, A2][F1, F2] -> [A1, A2, F1, F2]
  const bookedSeats =
    screening?.reservations.flatMap((reservation) => reservation.bookedSeats) ??
    [];

  //generate seats, from seats.ts in lib parameter, is rightside - false
  const leftSeats = generateSeats();
  const rightSeats = generateSeats(true);

  return (
    <div className="flex flex-col w-full h-screen bg-dark">
      <div
        id="head"
        className="w-full h-auto flex flex-row justify-between py-6 px-5 gap-6"
      >
        <div className="flex">
          <Link href={`/movies/${movieId}/select-time`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              className="size-4 flex self-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
        </div>
        <h3 className="text-white flex font-semibold text-base">
          Select Seats
        </h3>
        <div className="size-4 flex self-center"></div>
      </div>
      <div
        id="beams"
        className="w-full h-auto flex justify-center items-center flex-col"
      >
        <div className="mt-6">
          <div className="w-72 h-1 bg-yellow"></div>
          <div className="w-72 h-5 bg-gradient-to-b from-customOrange/20 to-customOrange/0"></div>
        </div>
      </div>

      {/* BEGIN OF SEAT ROWS */}
      <SelectSeats
        userId={user.id}
        screeningId={params.screeningId}
        leftSeats={leftSeats}
        rightSeats={rightSeats}
        reservedSeats={bookedSeats}
      />
      {/* END OF SEAT ROWS */}
      {/* BEGIN CART */}
    </div>
  );
}

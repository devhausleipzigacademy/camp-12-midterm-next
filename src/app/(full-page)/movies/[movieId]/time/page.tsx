import Link from "next/link";
import { TimeSelection } from "./time-selection";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { Screening } from "@prisma/client";

export default async function BookingTimePage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;

  // Fetch screenings for the given movieId, where the date is greater than or equal to the current date
  const screenings = await prisma.screening.findMany({
    where: {
      AND: [
        { movieId }, // Matches the movieId
        {
          date: {
            gte: new Date(), // Is greater than or equal to the current date
          },
        },
      ],
    },
  });
  console.log(screenings);

  const groupedScreenings = screenings.reduce<Record<string, Screening[]>>(
    (acc, screening) => {
      const date = format(screening.date, "yyyy-MM-dd");
      if (acc[date]) {
        acc[date].push(screening);
      } else {
        acc[date] = [screening];
      }
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col bg-dark h-dvh px-5 py-8">
      <div className="flex-col w-full items-center relative mb-8">
        <Link href={`/movies/${movieId}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-white absolute left-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <div className="text-white text-base text-center">
          Select Date & Time
        </div>
        <div className="text-white-dimmed text-sm py-2 px-2 font-bold">
          DATE
        </div>
        <TimeSelection movieId={movieId} screenings={groupedScreenings} />
      </div>
    </div>
  );
}

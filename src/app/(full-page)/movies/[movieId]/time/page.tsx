import Link from "next/link";
import { TimeSelection } from "./time-selection";

export default function BookingTimePage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;

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
        <TimeSelection />
      </div>

      <Link href={`/movies/${movieId}/select-seats`}>
        <div className="flex justify-center mt-auto pb-4">
          <button className="bg-yellow rounded-md text-dark-light font-semibold py-4 w-full text-sm">
            Select Seat
          </button>
        </div>
      </Link>
    </div>
  );
}

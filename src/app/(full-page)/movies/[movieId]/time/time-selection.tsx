"use client";

import { useContext, useState } from "react";
import { DisplayDate } from "./display-date";
import { TimeSlots } from "./time-slots";
import { BookingContext } from "@/providers/booking-context";
import { Screening } from "@prisma/client";
import { Label } from "./label";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/button";
import { createReservation } from "@/lib/actions/booking";
import Link from "next/link";

type Props = {
  movieId: string;
  screenings: Record<string, Screening[]>;
};

export function TimeSelection({ screenings, movieId }: Props) {
  const today = new Date();
  const { time, setTime, date, setDate } = useContext(BookingContext);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedDay = format(selectedDate, "yyyy-MM-dd");
  const selectedScreening = screenings[selectedDay]?.find(
    (s) => s.time === selectedTime
  );

  const times = screenings[selectedDay]
    ? screenings[selectedDay].filter((screening) =>
        isSameDay(screening.date, new Date(selectedDate))
      )
    : [];

  return (
    <>
      <div className="mb-6">
        {/* Date */}
        <div>
          <div className="grid grid-cols-4 gap-4 text-white-dimmed tracking-widest p-1 text-sm">
            {Object.keys(screenings).map((date, index) => (
              <Label
                key={date}
                selected={isSameDay(selectedDate, new Date(date))}
                disabled={false}
                handleClick={() => setSelectedDate(new Date(date))}
              >
                {format(new Date(date), "dd MMM")}
              </Label>
            ))}
          </div>
        </div>
        {/* Date End */}
        <div className="h-px my-5 bg-white-dimmed-heavy"></div>
        <div className="w-full">
          {/* Timeslots */}
          <div>
            <div className="text-white-dimmed text-sm py-4 px-2 font-bold">
              TIME
            </div>
            <div className="grid grid-cols-4 gap-4 text-white-dimmed p-1 text-sm tracking-widest">
              {times.map((time, index) => (
                <Label
                  selected={selectedTime === time.time}
                  disabled={false}
                  handleClick={() => setSelectedTime(time.time)}
                  key={index}
                >
                  {time.time}
                </Label>
              ))}
            </div>
          </div>
          {/* Timeslots End */}
        </div>
      </div>
      <Link href={`/movies/${movieId}/${selectedScreening?.id}/seats`}>
        <div className="flex justify-center mt-auto pb-4">
          <button className="bg-yellow rounded-md text-dark-light font-semibold py-4 w-full text-sm">
            Select Seat
          </button>
        </div>
      </Link>
    </>
  );
}

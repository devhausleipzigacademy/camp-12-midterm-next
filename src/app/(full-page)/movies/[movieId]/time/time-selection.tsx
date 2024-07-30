"use client";

import { useContext } from "react";
import { DisplayDate } from "./display-date";
import { TimeSlots } from "./time-slots";
import { BookingContext } from "@/providers/booking-context";

export function TimeSelection() {
  const today = new Date();
  const { time, setTime, date, setDate } = useContext(BookingContext);

  return (
    <div>
      <DisplayDate
        today={today}
        selectedDate={date}
        handleClick={(date: string) => setDate(date)}
      />
      <div className="h-px my-5 bg-white-dimmed-heavy"></div>
      <div className="w-full">
        <TimeSlots
          selectedTime={time}
          handleClick={(time: string) => setTime(time)}
        />
      </div>
    </div>
  );
}

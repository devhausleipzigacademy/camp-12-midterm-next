"use client";

import { useState } from "react";
import { DisplayDate } from "./display-date";
import { TimeSlots } from "./time-slots";

export function TimeSelection() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div>
      <DisplayDate
        today={today}
        selectedDate={selectedDate}
        handleClick={(date: string) => setSelectedDate(date)}
      />
      <div className="h-px my-5 bg-white-dimmed-heavy"></div>
      <div className="w-full">
        <TimeSlots
          selectedTime={selectedTime}
          handleClick={(time: string) => setSelectedTime(time)}
        />
      </div>
    </div>
  );
}

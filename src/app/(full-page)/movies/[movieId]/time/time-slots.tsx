"use client";
import { format, addHours, startOfToday, isBefore } from "date-fns";
import { Label } from "./label";

type Props = {
  selectedTime: string | null;
  handleClick: (time: string) => void;
};

export function TimeSlots({ selectedTime, handleClick }: Props) {
  const openingTime = 12; // Cinema opens at 12:00
  const closingTime = 22; // Cinema closes at 24 but last movie at 22:00
  const interval = 2; // every two hours

  const now = new Date();

  // Generate time slots from openingTime to closingTime
  const timeSlots = [];
  for (let hour = openingTime; hour <= closingTime; hour += interval) {
    const timeSlot = addHours(startOfToday(), hour);
    if (isBefore(now, timeSlot)) {
      timeSlots.push(format(timeSlot, "HH:mm"));
    }
  }

  return (
    <div>
      <div className="text-white-dimmed text-sm py-4 px-2 font-bold">TIME</div>
      <div className="grid grid-cols-4 gap-4 text-white-dimmed p-1 text-sm tracking-widest">
        {timeSlots.map((time, index) => (
          <Label
            selected={selectedTime === time}
            disabled={false}
            handleClick={() => handleClick(time)}
            key={index}
          >
            {time}
          </Label>
        ))}
      </div>
    </div>
  );
}

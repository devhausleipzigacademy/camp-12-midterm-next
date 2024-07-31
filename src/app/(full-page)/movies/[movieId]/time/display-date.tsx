"use client";

import { format, addDays } from "date-fns";
import { Label } from "./label";

type Props = {
  today: Date;
  selectedDate: string | null;
  handleClick: (date: string) => void;
};

export function DisplayDate({ today, selectedDate, handleClick }: Props) {
  // Generate an array of the next 12 days
  const next12Days = Array.from({ length: 12 }, (_, i) => addDays(today, i));

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 text-white-dimmed tracking-widest p-1 text-sm">
        {next12Days.map((date, index) => (
          <Label
            selected={selectedDate === format(date, "dd-MM-yyyy")}
            disabled={false}
            key={index}
            handleClick={() => handleClick(format(date, "dd-MM-yyyy"))}
          >
            {format(date, "dd MMM")}
          </Label>
        ))}
      </div>
    </div>
  );
}

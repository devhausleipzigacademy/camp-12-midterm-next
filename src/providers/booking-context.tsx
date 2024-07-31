"use client";
import { createContext, useState } from "react";

type BookingContextType = {
  date: string | null;
  setDate: React.Dispatch<React.SetStateAction<string | null>>;
  time: string | null;
  setTime: React.Dispatch<React.SetStateAction<string | null>>;
  seats: string[];
  setSeats: React.Dispatch<React.SetStateAction<string[]>>;
};

export const BookingContext = createContext<BookingContextType>({
  date: null,
  setDate: () => {},
  time: null,
  setTime: () => {},
  seats: [],
  setSeats: () => {},
});

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [seats, setSeats] = useState<string[]>([]);

  return (
    <BookingContext.Provider
      value={{ date, setDate, time, setTime, seats, setSeats }}
    >
      {children}
    </BookingContext.Provider>
  );
};

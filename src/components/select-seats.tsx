"use client";

import { Button } from "./button";
import { SeatCart } from "./seat-cart";
import { Seat as SeatType } from "@/lib/types/seats";
import { SeatMap } from "./seat-map";
import { useState } from "react";

type Props = {
  leftSeats: SeatType[];
  rightSeats: SeatType[];
  reservedSeats: string[];
};

export default function SelectSeats({
  leftSeats,
  rightSeats,
  reservedSeats,
}: Props) {
  // TODO: Use seats from context
  const [seats, setSeats] = useState<string[]>([]);

  // Move into Seat and get seats from context
  const handleSeatChange = (seatId: string) => {
    const updatedSeats = seats.includes(seatId)
      ? seats.filter((id) => id !== seatId)
      : [...seats, seatId];
    setSeats(updatedSeats);
  };

  const seatCounts = seats.reduce(
    (acc, id) => {
      if (id[0] === "A") acc.front += 1;
      else if (id[0] === "F") acc.back += 1;
      else acc.middle += 1;
      return acc;
    },
    { front: 0, middle: 0, back: 0 }
  );

  const { front, middle, back } = seatCounts;
  const sectionsSelected = [front > 0, middle > 0, back > 0].filter(
    Boolean
  ).length;

  const cartHeight =
    front === 0 && middle === 0 && back === 0
      ? "h-36"
      : sectionsSelected === 2
      ? "h-44"
      : sectionsSelected === 1
      ? "h-40"
      : "h-52";

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <SeatMap
          kinoSeats={leftSeats}
          reservedSeats={reservedSeats}
          handleSeatChange={handleSeatChange}
          seats={seats}
          className="ml-4"
        />
        <SeatMap
          kinoSeats={rightSeats}
          reservedSeats={reservedSeats}
          handleSeatChange={handleSeatChange}
          seats={seats}
          className="mr-4"
        />
      </div>
      <div
        id="categorys"
        className="flex flex-row gap-2 justify-around mt-1 px-6"
      >
        <div className="flex flex-row h-auto gap-2 items-center">
          <div className="bg-dark-light w-4 aspect-square rounded-full"></div>
          <small className="text-white-dimmed">Available</small>
        </div>
        <div className="flex flex-row h-auto gap-2 items-center">
          <div className="bg-yellow w-4 aspect-square rounded-full"></div>
          <small className="text-white-dimmed">Selected</small>
        </div>
        <div className="flex flex-row h-auto gap-2 items-center">
          <div className="bg-white w-4 aspect-square rounded-full"></div>
          <small className="text-white-dimmed">Reserved</small>
        </div>
      </div>
      <div
        id="cart"
        className={`fixed bottom-0 py-6 w-full ${cartHeight} bg-dark-light rounded-t-3xl flex flex-col`}
      >
        {front > 0 && (
          <div
            id="seats-front"
            className="text-white flex items-center justify-between px-6 mt-1"
          >
            <SeatCart count={front} category={"Seat-Front"} prize={"$12.95"} />
          </div>
        )}
        {middle > 0 && (
          <div
            id="seats-middle"
            className="text-white flex items-center justify-between px-6 mt-1"
          >
            <SeatCart
              count={middle}
              category={"Seat-Middle"}
              prize={"$14.95"}
            />
          </div>
        )}
        {back > 0 && (
          <div
            id="seats-back"
            className="text-white flex items-center justify-between pb-3 mx-6 mt-1 border-b border-b-white-dimmed"
          >
            <SeatCart count={back} category={"Seat-Back"} prize={"$16.95"} />
          </div>
        )}
        <div
          id="price-total"
          className="grid grid-cols-5 fixed bottom-5 justify-center items-center pr-4 pl-4"
        >
          <div className="col-start-1 col-end-3 bottom-0 flex flex-col text-white">
            <div className="total text-white-dimmed font-inter-500 text-xs">
              Total Price
            </div>
            <div className="prize font-inter-700 text-xl">
              ${(front * 12.95 + middle * 14.95 + back * 16.95).toFixed(2)}
            </div>
          </div>
          <div className="col-start-3 flex items-center w-52 h-12 mt-2">
            <Button variant="primary" size="default">
              Book Ticket
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

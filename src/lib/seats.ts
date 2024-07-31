import { Seat } from "./types/seats";

// generating seats in select-seats

export function generateSeats(isRightSide: boolean = false): Seat[] {
  const seatRows = ["A", "B", "C", "D", "E", "F"];
  const seats: Seat[] = [];
  const seatCount = 4;
  const offset = isRightSide ? 4 : 0;
  const nullSeatPosition = isRightSide ? 4 : 1;

  seatRows.forEach((row) => {
    for (let i = 1; i <= seatCount; i++) {
      const isEdgeRow = row === "A" || row === "F";
      const isNullSeat = isEdgeRow && i === nullSeatPosition;
      seats.push({
        id: isNullSeat ? null : row + (isEdgeRow ? i - 1 + offset : i + offset),
        isSelected: false,
      });
    }
  });

  return seats;
}

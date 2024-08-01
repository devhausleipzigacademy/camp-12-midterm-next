"use client";

type Props = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function TabButton({ label, selected, onSelect }: Props) {
  return (
    <button
      className={`w-full py-1 rounded text-center border ${
        selected
          ? "text-white bg-white-dimmed border-white"
          : " text-white-dimmed bg-dark-light border-dark-light"
      }`}
      onClick={onSelect}
    >
      {label}
    </button>
  );
}

import { Checkbox } from "@headlessui/react";

type Props = {
  disabled?: boolean;
  selected: boolean;
  onChange: (value: boolean) => void;
};

export function Seat({ disabled = false, selected, onChange }: Props) {
  return (
    <Checkbox
      checked={selected}
      onChange={onChange}
      disabled={disabled}
      className="group block size-7 rounded border bg-dark-light data-[checked]:bg-yellow data-[disabled]:cursor-not-allowed data-[disabled]:bg-white"
    />
  );
}

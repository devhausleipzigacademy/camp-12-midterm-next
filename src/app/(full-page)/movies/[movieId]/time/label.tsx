type Props = {
  selected: boolean;
  disabled: boolean;
  children: React.ReactNode;
  handleClick: () => void;
};

export function Label({ selected, disabled, children, handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`tracking-widest font-light text-sm py-1 disabled:text-white-dimmed-heavy ${
        selected ? "bg-yellow text-dark-light rounded-md" : "text-white-dimmed"
      }`}
    >
      {children}
    </button>
  );
}

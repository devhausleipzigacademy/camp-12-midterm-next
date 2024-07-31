type Props = {
  count: number;
  category: string;
  prize: string;
};
export const SeatCart = ({ count, category, prize }: Props) => {
  return (
    <>
      <div className="flex gap-8 items-center">
        <div className="text-white-dimmed text-xs font-inter-500">{count}x</div>
        <div>
          <h4 className="font-inter-500 text-xs text-white">{category}</h4>
        </div>
      </div>
      <div className="flex items-center">
        <small>
          {prize}
          <span className="text-white-dimmed text-xs">/each</span>
        </small>
      </div>
    </>
  );
};

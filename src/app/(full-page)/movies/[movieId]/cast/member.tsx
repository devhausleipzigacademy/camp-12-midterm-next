export type Props = {
  image: string;
  name: string;
  role: string;
};

export const Member = ({ image, name, role }: Props) => {
  return (
    <>
      <div className="col-span-full row-span-1">
        <div className="flex gap-5 mb-4 justify-start items-center">
          <img
            src={image}
            alt={name}
            className="size-16 object-cover bg-white-dimmed-heavy"
          />
          <div>
            <h2 className="text-white font-bold text-sm mb-1">{name}</h2>
            <p className="text-white-dimmed text-xs">{role}</p>
          </div>
        </div>
      </div>
    </>
  );
};

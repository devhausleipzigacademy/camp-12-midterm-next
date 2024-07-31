import Image from "next/image";
type UserImageProps = {
  userName: string;
  userImage: string;
};

export function UserImage({ userName, userImage }: UserImageProps) {
  return (
    <div className="flex text-white justify-between items-center">
      <div className="flex flex-col font-bold gap-3">
        <div className="text-white-dimmed text-xs"></div>
      </div>
      <div className="w-10 h-10">
        <img
          src={userImage}
          alt={`${userName}'s avatar`}
          className="w-full h-full rounded-full"
        />
      </div>
    </div>
  );
}

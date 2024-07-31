import Link from "next/link";

type HomepageHeaderProps = {
  userName: string;
  userImage: string;
};

export function HomepageHeader({ userName, userImage }: HomepageHeaderProps) {
  return (
    <div className="flex bg-dark text-white justify-between items-center">
      <div className="flex flex-col font-bold gap-3">
        <div className="text-white-dimmed text-xs">
          Welcome {userName} <span className="text-white">👋</span>
        </div>
        <div className="text-sm">Let&apos;s relax and watch a movie!</div>
      </div>
      <Link href="/profile" className="bg-white w-10 h-10 rounded-full">
        <img
          src={userImage}
          alt={`${userName}'s avatar`}
          className="w-full h-full rounded-full"
        />
      </Link>
    </div>
  );
}

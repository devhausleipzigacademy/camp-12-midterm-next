import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Genre } from "@/lib/genre";

type Props = {
  text: string;
  ShowSeeAll?: boolean;
  route?: string;
  state?: Genre[];
};

export function SectionTitle({ text, ShowSeeAll, route, state }: Props) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white font-medium">{text}</span>
      {ShowSeeAll && (
        <Link href={route ? route : "/"} className="text-yellow text-sm">
          <div className="flex flex-row items-center">
            <span className="whitespace-nowrap">See All</span>
            <ChevronRightIcon className="ml-2 w-5 h-5" />
          </div>
        </Link>
      )}
    </div>
  );
}

"use client";

import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { TabButton } from "./tab-button";
import Link from "next/link";
import { useState } from "react";
import { Member } from "./member";
import { MovieCredit, MovieDetail } from "@/lib/types/movie";

type Props = {
  movie: MovieDetail;
  credits: MovieCredit;
};

type GroupedCrewMember = {
  name: string;
  profile_path: string | null;
  jobs: string[];
};

export function Switcher({ movie, credits }: Props) {
  const [selectedTab, setSelectedTab] = useState<"cast" | "crew">("cast");
  function members(selectedTab: string): JSX.Element[] | null {
    if (!movie || !credits) {
      return null;
    }

    if (selectedTab === "cast") {
      return credits.cast.map((person) => (
        <Member
          key={person.id}
          role={person.character}
          name={person.name}
          image={
            person.profile_path === null
              ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
              : `https://image.tmdb.org/t/p/w500/${person.profile_path}`
          }
        />
      ));
    } else {
      const crewGrouped = credits.crew.reduce<
        Record<string, GroupedCrewMember>
      >((acc, person) => {
        const key = `${person.name}-${person.profile_path}`;
        if (!acc[key]) {
          acc[key] = {
            name: person.name,
            profile_path: person.profile_path,
            jobs: [person.job],
          };
        } else {
          acc[key].jobs.push(person.job);
        }
        return acc;
      }, {});

      return Object.values(crewGrouped).map((person: GroupedCrewMember) => (
        <Member
          key={`${person.name}-${person.jobs.join("-")}`}
          role={person.jobs.join(" & ")}
          name={person.name}
          image={
            person.profile_path === null
              ? "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
              : `https://image.tmdb.org/t/p/w500/${person.profile_path}`
          }
        />
      ));
    }
  }
  return (
    <div className="grid grid-cols-4 p-5 gap-4 justify-start items-start">
      <div className="col-span-full items-center justify-center relative px-4">
        <div className="fixed top-0 left-0 w-full bg-dark p-4 z-10 flex flex-col">
          <div className="relative flex items-center">
            <IconContext.Provider value={{ color: "white", size: "20px" }}>
              <Link
                href={`/movies/${movie.id}`}
                className="absolute left-4 text-white mb-2"
              >
                <IoIosArrowBack />
              </Link>
            </IconContext.Provider>
            <h1 className="text-center text-white w-full mb-2">Cast & Crew</h1>
          </div>
          <div className=" gap-4 flex justify-around mt-2">
            <TabButton
              selected={selectedTab === "cast"}
              label={"Cast"}
              onSelect={() => setSelectedTab("cast")}
            />
            <TabButton
              selected={selectedTab === "crew"}
              label={"Crew"}
              onSelect={() => setSelectedTab("crew")}
            />
          </div>
        </div>
      </div>
      <div className="col-span-full justify-start mt-20">
        {members(selectedTab)}
      </div>
    </div>
  );
}

import { MovieCredit, MovieDetail } from "@/lib/types/movie";
import axios from "axios";
import { Switcher } from "./switcher";

type GroupedCrewMember = {
  name: string;
  profile_path: string | null;
  jobs: string[];
};

const CastPage = async ({ params }: { params: { movieId: string } }) => {
  // toggle between cast and crew
  const movie = await axios
    .get<MovieDetail>(`https://api.themoviedb.org/3/movie/${params.movieId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "en-US",
      },
    })
    .then((res) => res.data);
  const credits = await axios
    .get<MovieCredit>(
      `https://api.themoviedb.org/3/movie/${params.movieId}/credits`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
        },
      }
    )
    .then((res) => res.data);
  return (
    <div className="bg-dark h-fit">
      <Switcher movie={movie} credits={credits} />
    </div>
  );
};

export default CastPage;

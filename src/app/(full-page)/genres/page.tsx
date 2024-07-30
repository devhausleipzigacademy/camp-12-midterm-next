import { GetServerSideProps } from "next";
import { knownGenres, Genre } from "../../../lib/utils";
import { GenreButton } from "../../../components/genre-button";
import { useState } from "react";

interface GenresPageProps {
  genres: Genre[];
}

const GenresPage = ({ genres }: GenresPageProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {genres.map((genre) => (
        <GenreButton
          key={genre}
          genre={genre}
          selected={selectedGenre === genre}
          onClick={() => setSelectedGenre(genre)}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch genres data here if it's dynamic, otherwise use knownGenres
  // For this example, we use knownGenres directly.
  return {
    props: {
      genres: knownGenres,
    },
  };
};

export default GenresPage;

import { knownGenres, Genre } from "../../../lib/utils";
import { GenreButton } from "../../../components/genre-button";
import { useState } from "react";

const GenresPage = () => {
  // Using useState to manage the selected genre in the client-side
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  // Rendering the genres buttons and allowing selection
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {knownGenres.map((genre) => (
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

export default GenresPage;

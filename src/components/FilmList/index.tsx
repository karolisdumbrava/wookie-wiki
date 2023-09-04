import React from "react";
import {StarWarsFilm} from "../../redux/types";

interface FilmListProps {
    films: StarWarsFilm[];
    handleShowPeople: (film: StarWarsFilm) => void;
}


const FilmList: React.FC<FilmListProps> = ({ films, handleShowPeople}) => {

  return (
    <>
        {films.map((film, key) => (
            <div
              key={key}
              className="inline-block bg-gray-800 p-4 rounded-lg mb-4 min-w-64 mr-4"
            >
              <h2 className="text-2xl font-bold mb-2">{film.title}</h2>
              <p className="text-lg mb-2">Episode {film.episode_id}</p>
              <p className="text-lg mb-2">Release Date: {film.release_date}</p>
              <button
                onClick={() => handleShowPeople(film)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rouded"
              >
                Show people
              </button>
            </div>
        ))}
      </>
  );
};

export default FilmList;

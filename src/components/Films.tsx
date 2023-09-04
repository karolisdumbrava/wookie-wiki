import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { LoadingSpinner } from "../assets/LoadingSpinner";
import { StarWarsCharacter, StarWarsFilm } from "../redux/types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { setFilms, setSelectedFilm } from "../redux/actions/films";
import { setCharacters } from "../redux/actions/characters";


export const Films = () => {

    const dispatch = useDispatch();
    const films = useSelector((state: RootState) => state.films);
    const selectedFilm = useSelector((state: RootState) => state.films.selectedFilm);
    console.log('selectedFilm', selectedFilm)
    const characters = useSelector((state: RootState) => state.films.characters);
//   const [films, setFilms] = useState<StarWarsFilm[] | null>(null);
//   const [selectedFilm, setSelectedFilm] = useState<StarWarsFilm | null>(null);
//   const [characters, setCharacters] = useState<StarWarsCharacter[] | null>(
//     null
//   );

  const [loadingFilms, setLoadingFilms] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  const handleShowPeople = (film: StarWarsFilm) => {
    setLoadingCharacters(true);
    // setSelectedFilm(film);
    // dispatch(setCharacters(data))
    console.log('Film', film)
    dispatch(setSelectedFilm(film));
    const fetchCharacters = async () => {
      const data = await Promise.all(
        film.characters.map((url: string) => fetchData(url))
      );
    //   setCharacters(data); 
        dispatch(setCharacters(data));
      setLoadingCharacters(false);
    };
    fetchCharacters();
  };

  useEffect(() => {
    const fetchFilms = async () => {
      const data = await fetchData("https://swapi.dev/api/films/");
    //   setFilms(data.results);
        dispatch(setFilms(data.results));
      setLoadingFilms(false);
    };
    fetchFilms();
  }, [dispatch]);

  return (
    <div className="p-4 w-screen">
      <h1 className="text-3xl font-bold mb-4">Films</h1>
      <div className="overflow-auto whitespace-nowrap">
        {loadingFilms && <LoadingSpinner />}
        {films?.map((film:StarWarsFilm, key:number) => {
          return (
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
          );
        })}
      </div>
      {selectedFilm && (
        <div className="mt-4 overflow-y-auto h-[500px]">
          <h2 className="text-2xl font-bold mb-2">{selectedFilm.title}</h2>
          <p className="text-lg mb-2">Episode {selectedFilm.episode_id}</p>
          <p className="text-lg mb-2">
            Release Date: {selectedFilm.release_date}
          </p>
          <h3 className="text-xl font-bold mb-2">Characters</h3>
          <ul>
            {loadingCharacters && <LoadingSpinner />}

            {characters?.map((character: StarWarsCharacter, key:number) => {
              return (
                <li key={key} className="text-lg mb-2">
                  {character.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

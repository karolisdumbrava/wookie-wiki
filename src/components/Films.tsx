import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { LoadingSpinner } from "../assets/LoadingSpinner";
import { StarWarsFilm } from "../redux/types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { setFilms, setSelectedFilm } from "../redux/actions/films";
import { setCharacters } from "../redux/actions/characters";
import FilmList from "./FilmList/FilmList";
import CharacterList from "./CharacterList/CharacterList";

export const Films = () => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films);
  const selectedFilm = useSelector((state: RootState) => state.selectedFilm);
  const characters = useSelector((state: RootState) => state.characters);

  const [fetchMessageMovies, setFetchMessageMovies] = useState<string | null>(
    null
  );
  const [fetchMessageCharacters, setFetchMessageCharacters] = useState<
    string | null
  >(null);

  const [loadingFilms, setLoadingFilms] = useState(false);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  const handleShowPeople = (film: StarWarsFilm) => {
    dispatch(setCharacters([]));
    setFetchMessageCharacters(null);

    setLoadingCharacters(true);
    dispatch(setSelectedFilm(film));

    const fetchCharacters = async () => {
      const data = await Promise.all(
        film.characters.map((url: string) => fetchData(url))
      );

      const validCharacters = data.filter(Boolean);
      if (validCharacters.length === 0) {
        setFetchMessageCharacters("Failed to fetch characters");
      } else if (validCharacters.length !== film.characters.length) {
        setFetchMessageCharacters(
          `Failed to fetch ${
            film.characters.length - validCharacters.length
          } out of ${film.characters.length} characters`
        );
      }

      dispatch(setCharacters(validCharacters));
      setLoadingCharacters(false);
    };

    fetchCharacters();
  };

  useEffect(() => {
    const fetchFilms = async () => {
      const data = await fetchData("https://swapi.dev/api/films/");
      if (data && data.results) {
        dispatch(setFilms(data.results));
      } else {
        setFetchMessageMovies("Failed to fetch movies");
        dispatch(setFilms([]));
      }
      setLoadingFilms(false);
    };

    if (films.length === 0) {
      setLoadingFilms(true);
      fetchFilms();
    }
  }, [dispatch, films]);

  return (
    <div className="p-4 w-screen">
      <h1 className="text-3xl font-bold mb-4">Films</h1>
      <div className="overflow-auto whitespace-nowrap">
        {loadingFilms && <LoadingSpinner />}

        {fetchMessageMovies && !loadingFilms && (
          <p className="text-red-500 mb-2">{fetchMessageMovies}</p>
        )}
        <FilmList films={films} handleShowPeople={handleShowPeople} />
      </div>
      {selectedFilm && (
        <CharacterList
          handleShowPeople={handleShowPeople}
          characters={characters}
          selectedFilm={selectedFilm}
          fetchMessageCharacters={fetchMessageCharacters}
          loadingCharacters={loadingCharacters}
        />
      )}
    </div>
  );
};

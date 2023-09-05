import React from "react";
import { useSelector } from "react-redux";
import { StarWarsCharacter, StarWarsFilm } from "../../redux/types";
import { RootState } from "../../redux/reducers";
import { LoadingSpinner } from "../../assets/LoadingSpinner";

interface CharacterListProps {
  characters: StarWarsCharacter[];
  selectedFilm: StarWarsFilm;
  fetchMessageCharacters: string | null;
  loadingCharacters: boolean;
  handleShowPeople: (film: StarWarsFilm) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  selectedFilm,
  fetchMessageCharacters,
  loadingCharacters,
  handleShowPeople,
}) => {
  const characters = useSelector((state: RootState) => state.characters);

  return (
    <div className="mt-4 overflow-y-auto h-[500px]">
      <h2 className="text-2xl font-bold mb-2">{selectedFilm.title}</h2>
      <p className="text-lg mb-2">Episode {selectedFilm.episode_id}</p>
      <p className="text-lg mb-2">Release Date: {selectedFilm.release_date}</p>
      <h3 className="text-xl font-bold mb-2">People in Film Title :</h3>
      {fetchMessageCharacters && (
        <div className="flex justify-between">
          <div className="text-red-500 mb-2">{fetchMessageCharacters}</div>
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleShowPeople(selectedFilm)}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      <ul>
        {loadingCharacters && <LoadingSpinner />}
        {!loadingCharacters && (
          <div className="grid grid-cols-4 text-lg font-bold mb-2">
            <div>Name</div>
            <div>Birth Year</div>
            <div>Gender</div>
            <div>Mass</div>
          </div>
        )}
        {characters && characters.length > 0 ? (
          characters?.map((character: StarWarsCharacter, key: number) => {
            return (
              <li key={key} className="text-lg mb-2 grid grid-cols-4">
                <div>{character.name}</div>
                <div>{character.birth_year}</div>
                <div>{character.gender}</div>
                <div>
                  {character.mass} {character.mass !== "unknown" && "kg"}
                </div>
              </li>
            );
          })
        ) : (
          <div>
            {fetchMessageCharacters && (
              <div className="text-red-500 mb-2">{fetchMessageCharacters}</div>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default CharacterList;

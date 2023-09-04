import { StarWarsCharacter } from "../types";

export const SET_CHARACTERS = "SET_CHARACTERS";

export const setCharacters = (characters: StarWarsCharacter[]) => ({
  type: SET_CHARACTERS,
  payload: characters,
});

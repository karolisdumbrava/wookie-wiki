import { SET_CHARACTERS } from "../actions/characters";
import { StarWarsCharacter } from "../types";

const initialCharactersState: StarWarsCharacter[] = [];

export const charactersReducer = (
  state = initialCharactersState,
  action: any
) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return action.payload;
    default:
      return state;
  }
};

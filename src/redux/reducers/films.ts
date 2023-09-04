import { SET_FILMS, SET_SELECTED_FILM } from "../actions/films";
import { StarWarsFilm } from "../types";

const initialFilmState: StarWarsFilm[] = [];
const initialSelectedFilmState: StarWarsFilm | null = null;

export const filmsReducer = (state = initialFilmState, action: any) => {
  switch (action.type) {
    case SET_FILMS:
      return action.payload;
    default:
      return state;
  }
};

export const selectedFilmReducer = (
  state = initialSelectedFilmState,
  action: any
) => {
  switch (action.type) {
    case SET_SELECTED_FILM:
      return action.payload;
    default:
      return state;
  }
};



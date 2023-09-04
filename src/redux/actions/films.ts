import { StarWarsFilm } from "../types";

export const SET_FILMS = "SET_FILMS";
export const SET_SELECTED_FILM = "SET_SELECTED_FILM";

export const setFilms = (films: StarWarsFilm[]) => ({
  type: SET_FILMS,
  payload: films,
});

export const setSelectedFilm = (film: StarWarsFilm) => ({
  type: SET_SELECTED_FILM,
  payload: film,
});

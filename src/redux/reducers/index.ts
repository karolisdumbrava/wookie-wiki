import { combineReducers } from "@reduxjs/toolkit";
import { charactersReducer } from "./characters";
import { filmsReducer, selectedFilmReducer } from "./films";

const rootReducer = combineReducers({
    films: filmsReducer,
    selectedFilm: selectedFilmReducer,
    characters: charactersReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
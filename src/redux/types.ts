export type StarWarsFilm = {
  title: string;
  episode_id: number;
  release_date: string;
  characters: string[];
};

export type StarWarsCharacter = {
  name: string;
  birth_year: string;
  gender: string;
  mass: string;
};

interface RootState {
  films: StarWarsFilm[];
  characters: StarWarsCharacter[];
}


import { Provider } from "react-redux";
import CharacterList from "./CharacterList";
import store, { createStore } from "../../redux/store";
import { render, screen, waitFor } from "@testing-library/react";
import { StarWarsFilm } from "../../redux/types";
import { useSelector } from "react-redux";

jest.mock("../../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("<CharacterList />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <CharacterList
          selectedFilm={{
            title: "A New Hope",
            episode_id: 4,
            release_date: "1997-05-25",
            characters: ["char_url_1"],
          }}
          characters={[]}
          fetchMessageCharacters={null}
          loadingCharacters={false}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  it("displays characters when fetched successfully", async () => {
    const store = createStore();
    (useSelector as jest.Mock).mockReturnValue({
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1997-05-25",
          characters: ["char_url_1"],
        },
      ],
    });

    (useSelector as jest.Mock).mockReturnValue([
      {
        name: "Luke Skywalker",
        birth_year: "19BBY",
        gender: "Male",
        mass: "77",
      },
    ]);

    render(
      <Provider store={store}>
        <CharacterList
          selectedFilm={{
            title: "A New Hope",
            episode_id: 4,
            release_date: "1997-05-25",
            characters: ["char_url_1"],
          }}
          characters={[]}
          fetchMessageCharacters={null}
          loadingCharacters={false}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );

    await screen.findByText("Luke Skywalker");
  });

  it("displays error message when characters fail to fetch", async () => {
    const store = createStore();
    (useSelector as jest.Mock).mockReturnValue({
      characters: null,
      fetchMessageCharacters: "Failed to fetch characters",
    });

    (useSelector as jest.Mock).mockReturnValue(null);

    render(
      <Provider store={store}>
        <CharacterList
          selectedFilm={{
            title: "A New Hope",
            episode_id: 4,
            release_date: "1997-05-25",
            characters: ["char_url_1"],
          }}
          characters={[]}
          fetchMessageCharacters={"Failed to fetch characters"}
          loadingCharacters={false}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );

    await screen.findAllByText("Failed to fetch characters");
  });

  it("stops loading when characters are fetched", async () => {
    const store = createStore();
    (useSelector as jest.Mock).mockReturnValue({
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1997-05-25",
          characters: ["char_url_1"],
        },
      ],
    });

    (useSelector as jest.Mock).mockReturnValue([
      {
        name: "Luke Skywalker",
        birth_year: "19BBY",
        gender: "Male",
        mass: "77",
      },
    ]);

    render(
      <Provider store={store}>
        <CharacterList
          selectedFilm={{
            title: "A New Hope",
            episode_id: 4,
            release_date: "1997-05-25",
            characters: ["char_url_1"],
          }}
          characters={[]}
          fetchMessageCharacters={null}
          loadingCharacters={false}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});

import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import store from "../../redux/store";
import * as api from "../../utils/api";
import FilmList from "./FilmList";
import { StarWarsFilm } from "../../redux/types";

jest.mock("../../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("<FilmList />", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <FilmList
          films={[
            {
              title: "A New Hope",
              episode_id: 4,
              release_date: "1997-05-25",
              characters: ["char_url_1"],
            },
          ]}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  it("displays films when fetched successfully", async () => {
    (api.fetchData as jest.Mock).mockResolvedValueOnce({
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1997-05-25",
          characters: ["char_url_1"],
        },
      ],
    });

    render(
      <Provider store={store}>
        <FilmList
          films={[
            {
              title: "A New Hope",
              episode_id: 4,
              release_date: "1997-05-25",
              characters: ["char_url_1"],
            },
          ]}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );

    await screen.findByText("A New Hope");
  });

  it("successfully displays show people button", async () => {
    (api.fetchData as jest.Mock).mockResolvedValueOnce({
      results: [
        {
          title: "A New Hope",
          episode_id: 4,
          release_date: "1997-05-25",
          characters: ["char_url_1"],
        },
      ],
    });

    render(
      <Provider store={store}>
        <FilmList
          films={[
            {
              title: "A New Hope",
              episode_id: 4,
              release_date: "1997-05-25",
              characters: ["char_url_1"],
            },
          ]}
          handleShowPeople={function (film: StarWarsFilm): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Provider>
    );

    await screen.findByText("A New Hope");

    const button = screen.getByRole("button", { name: /show people/i });
    expect(button).toBeInTheDocument();
  });
});

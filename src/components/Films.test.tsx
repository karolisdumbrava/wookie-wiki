import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Films } from "./Films";
import store, { createStore } from "../redux/store";
import * as api from "../utils/api";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../utils/api");

describe("<Films />", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );
    expect(screen.getByText("Films")).toBeInTheDocument();
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
        <Films />
      </Provider>
    );

    await screen.findByText("A New Hope");
  });

  it("displays loading spinner when fetching films", async () => {
    const store = createStore();
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
        <Films />
      </Provider>
    );

    await screen.findByText("Loading...");
  });

  it("Stops Loading when films are fetched", async () => {
    const store = createStore();
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
        <Films />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

});

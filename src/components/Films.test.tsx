import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("displays characters when film is clicked", async () => {
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

    (api.fetchData as jest.Mock).mockResolvedValueOnce({
      name: "Luke Skywalker",
      birth_year: "19BBY",
      gender: "male",
      mass: "77",
    });

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    fireEvent.click(await screen.findByText("Show people"));
    await screen.findByText("Luke Skywalker");
  });

  it("displays error message when films fail to fetch", async () => {
    const store = createStore();

    (api.fetchData as jest.Mock).mockResolvedValueOnce(null);

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    await screen.findByText("Failed to fetch movies");
  });

  it("displays error message when characters fail to fetch", async () => {
    const store = createStore();

    jest.clearAllMocks();

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

    fireEvent.click(await screen.findByText("Show people"));
    await screen.findByText("Failed to fetch 1 out of 1 characters");
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

  it("displays loading spinner when fetching characters", async () => {
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

    (api.fetchData as jest.Mock).mockResolvedValueOnce({
      name: "Luke Skywalker",
      birth_year: "19BBY",
      gender: "male",
      mass: "77",
    });

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    fireEvent.click(await screen.findByText("Show people"));
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

  it("Stops Loading when characters are fetched", async () => {
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

    (api.fetchData as jest.Mock).mockResolvedValueOnce({
      name: "Luke Skywalker",
      birth_year: "19BBY",
      gender: "Male",
      mass: "77",
    });

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    fireEvent.click(await screen.findByText("Show people"));
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("Stops Loading when films fail to fetch", async () => {
    const store = createStore();
    (api.fetchData as jest.Mock).mockResolvedValueOnce(null);

    render(
      <Provider store={store}>
        <Films />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("Stops Loading when characters fail to fetch", async () => {
    const store = createStore();

    jest.clearAllMocks();

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

    fireEvent.click(await screen.findByText("Show people"));

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

});

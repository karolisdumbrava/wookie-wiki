import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

test("renders App correctly", () => {
  render(
    <MemoryRouter>
        <App useRouter={false} />
    </MemoryRouter>
  );
  expect(screen.getByText("Wookiee-Wiki")).toBeInTheDocument();
});

test("navigates to correct About route", async () => {
  render(
    <MemoryRouter initialEntries={["/about"]}>
        <App useRouter={false} />
    </MemoryRouter>
  );
  await screen.findAllByText("About");
});

test("navigates to correct Films route", async () => {
  render(
    <MemoryRouter initialEntries={["/films"]}>
      <Provider store={store}>
        <App useRouter={false} />
      </Provider>
    </MemoryRouter>
  );
  await screen.findAllByText("Films");
});



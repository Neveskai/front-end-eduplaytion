import React from "react";
import { render, screen } from "@testing-library/react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import ProfileView from "./ProfileView";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

let container: ReactDOM.Container | null;

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container != null) {
    document.body.removeChild(container);
    container = null;
  }
});

it("renders learn react link", () => {
  act(() => {
    ReactDOM.render(
      <MemoryRouter initialEntries={["/login"]}>
        <ProfileView />
      </MemoryRouter>,
      container
    );
  });

  const linkElement = screen.getByText(/profile/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import NavbarView from "../components/NavbarView";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("NavbarView", () => {
  it("renders three nav links", () => {
    render(
      <SessionProvider session={false}>
        <NavbarView />
      </SessionProvider>
    );

    const home = screen.getByText("Home");
    const list = screen.getByText("List");
    const board = screen.getByText("Board");

    expect(home).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(board).toBeInTheDocument();
  });

  it("renders a access button", () => {
    render(
      <SessionProvider session={false}>
        <NavbarView />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Access" });

    expect(button).toBeInTheDocument();
  });
});

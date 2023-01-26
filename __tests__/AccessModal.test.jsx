import { render, screen } from "@testing-library/react";
import AccessModal from "../components/AccessModal";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("AccessModal", () => {
  it("renders close button", () => {
    render(
      <SessionProvider>
        <AccessModal showModal={() => {}} />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toBeInTheDocument();
  });

  it("renders default heading for unauthenticated users", () => {
    render(
      <SessionProvider>
        <AccessModal showModal={() => {}} />
      </SessionProvider>
    );

    const heading = screen.getByRole("heading", { name: "Welcome back!" });

    expect(heading).toBeInTheDocument();
  });

  it("renders default info for unauthenticated users", () => {
    render(
      <SessionProvider>
        <AccessModal showModal={() => {}} />
      </SessionProvider>
    );

    const info = screen.getByText("You don't have an account yet?");

    expect(info).toBeInTheDocument();
  });
});

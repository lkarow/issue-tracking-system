import { render, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("LoginForm", () => {
  it("renders inputs and labels for username and password", () => {
    render(
      <SessionProvider>
        <LoginForm />
      </SessionProvider>
    );

    const inputUsername = screen.getByRole("textbox", { name: "Username" });
    const labelUsername = screen.getByLabelText("Username");
    const inputPassword = screen.getByLabelText("Password", {
      selector: "input",
    });
    const labelPassword = screen.getByLabelText("Password");

    expect(inputUsername).toBeInTheDocument();
    expect(labelUsername).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute("type", "password");
    expect(labelPassword).toBeInTheDocument();
  });

  it("renders log in button", () => {
    render(
      <SessionProvider>
        <LoginForm />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Log in" });

    expect(button).toBeInTheDocument();
  });
});

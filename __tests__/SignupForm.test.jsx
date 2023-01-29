import { render, screen } from "@testing-library/react";
import SignupForm from "../components/SignupForm";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("SignupForm", () => {
  it("renders inputs and labels for username, email and password", () => {
    render(
      <SessionProvider session={false}>
        <SignupForm />
      </SessionProvider>
    );

    const inputUsername = screen.getByLabelText("Username", {
      selector: "input",
    });
    const labelUsername = screen.getByLabelText("Username");
    const inputEmail = screen.getByLabelText("Email", {
      selector: "input",
    });
    const labelEmail = screen.getByLabelText("Email");
    const inputPassword = screen.getByLabelText("Password", {
      selector: "input",
    });
    const labelPassword = screen.getByLabelText("Password");

    expect(inputUsername).toBeInTheDocument();
    expect(labelUsername).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute("type", "password");
    expect(labelPassword).toBeInTheDocument();
  });

  it("renders sign up button", () => {
    render(
      <SessionProvider session={false}>
        <SignupForm />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Sign up" });

    expect(button).toBeInTheDocument();
  });
});

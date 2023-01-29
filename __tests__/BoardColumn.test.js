import { render, screen } from "@testing-library/react";
import Boardcolumn from "../components/Boardcolumn";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("Boardcolumn", () => {
  it("renders the column title", () => {
    render(
      <SessionProvider session={true}>
        <Boardcolumn tasks={[]} columnTitle={"Open"} status={"open"} />
      </SessionProvider>
    );

    const columnTitle = screen.getByText("Open");

    expect(columnTitle).toBeInTheDocument();
  });

  it("renders textarea to create new task if user is logged in", () => {
    render(
      <SessionProvider session={true}>
        <Boardcolumn tasks={[]} columnTitle={"Open"} status={"open"} />
      </SessionProvider>
    );

    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
  });

  it("renders no textarea to create new task if user is not logged in", () => {
    render(
      <SessionProvider session={false}>
        <Boardcolumn tasks={[]} columnTitle={"Open"} status={"open"} />
      </SessionProvider>
    );

    const textarea = screen.queryByRole("textbox");

    expect(textarea).not.toBeInTheDocument();
  });
});

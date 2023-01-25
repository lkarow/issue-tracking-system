import { render, screen } from "@testing-library/react";
import Boardcolumn from "../components/Boardcolumn";
import "@testing-library/jest-dom";

describe("Boardcolumn", () => {
  it("renders the column title", () => {
    render(<Boardcolumn tasks={[]} columnTitle={"Open"} status={"open"} />);

    const columnTitle = screen.getByText("Open");

    expect(columnTitle).toBeInTheDocument();
  });

  it("renders textarea to create new task", () => {
    render(<Boardcolumn tasks={[]} columnTitle={"Open"} status={"open"} />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
  });
});

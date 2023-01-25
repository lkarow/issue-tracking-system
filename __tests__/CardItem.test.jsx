import { render, screen } from "@testing-library/react";
import CardItem from "../components/CardItem";
import "@testing-library/jest-dom";

describe("CardItem", () => {
  it("renders title, date and assignee", () => {
    render(
      <CardItem
        task={{
          _id: "0",
          Title: "Test Title",
          Description: "Test Descirption",
          Status: "open",
          Author: "Test Author",
          Assignee: "Test Assignee",
          Date: "2023-01-01",
        }}
      />
    );

    const testTitle = screen.getByText("Test Title");
    const testDate = screen.getByText("2023-01-01");
    const testAssignee = screen.getByText("Test Assignee");

    expect(testTitle).toBeInTheDocument();
    expect(testDate).toBeInTheDocument();
    expect(testAssignee).toBeInTheDocument();
  });

  it("renders edit button with aria label", () => {
    render(
      <CardItem
        task={{
          _id: "0",
          Title: "Test Title",
          Description: "Test Descirption",
          Status: "open",
          Author: "Test Author",
          Assignee: "Test Assignee",
          Date: "2023-01-01",
        }}
      />
    );

    const editButton = screen.getByRole("button", { name: "Edit" });

    expect(editButton).toBeInTheDocument();
  });
});

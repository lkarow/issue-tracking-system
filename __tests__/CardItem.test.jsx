import { render, screen } from "@testing-library/react";
import CardItem from "../components/CardItem";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("CardItem", () => {
  it("renders title, date and assignee", () => {
    render(
      <SessionProvider>
        <CardItem
          task={{
            _id: "0",
            Title: "Test Title",
            Description: "Test Description",
            Status: "open",
            Author: "Test Author",
            Assignee: "Test Assignee",
            Date: "2023-01-01",
          }}
        />
      </SessionProvider>
    );

    const testTitle = screen.getByText("Test Title");
    const testDate = screen.getByText("2023-01-01");
    const testAssignee = screen.getByText("Test Assignee");

    expect(testTitle).toBeInTheDocument();
    expect(testDate).toBeInTheDocument();
    expect(testAssignee).toBeInTheDocument();
  });

  it("renders no date icon and name if none is included in the task data", () => {
    render(
      <SessionProvider>
        <CardItem
          task={{
            _id: "0",
            Title: "Test Title",
            Description: "Test Description",
            Status: "open",
            Author: "Test Author",
            Assignee: "Test Assignee",
            Date: "",
          }}
        />
      </SessionProvider>
    );

    const testDate = screen.queryByTestId("card-date");

    expect(testDate).not.toBeInTheDocument();
  });

  it("renders no user icon and name if none is included in the task data", () => {
    render(
      <SessionProvider>
        <CardItem
          task={{
            _id: "0",
            Title: "Test Title",
            Description: "Test Description",
            Status: "open",
            Author: "Test Author",
            Assignee: "",
            Date: "2023-01-01",
          }}
        />
      </SessionProvider>
    );

    const testAssignee = screen.queryByTestId("card-assignee");

    expect(testAssignee).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import TaskTableRow from "../components/TaskTableRow";
import "@testing-library/jest-dom";

describe("TaskTableRow", () => {
  it("renders title, author, date, status and assignee of a task", () => {
    render(
      <TaskTableRow
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

    const taskTitle = screen.getByText("Test Title");
    const taskAuthor = screen.getByText("Test Author");
    const taskDate = screen.getByText("2023-01-01");
    const taskStatus = screen.getByText("open");
    const taskAssignee = screen.getByText("Test Assignee");

    expect(taskTitle).toBeInTheDocument();
    expect(taskAuthor).toBeInTheDocument();
    expect(taskDate).toBeInTheDocument();
    expect(taskStatus).toBeInTheDocument();
    expect(taskAssignee).toBeInTheDocument();
  });
});

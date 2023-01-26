import { render, screen } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TaskForm", () => {
  it("renders inputs and labels for title, description, status, date, assignee and author", () => {
    render(
      <SessionProvider>
        <TaskForm />
      </SessionProvider>
    );

    const inputTitle = screen.getByLabelText("Title*", {
      selector: "input",
    });
    const labelTitle = screen.getByLabelText("Title*");
    const inputStatus = screen.getByRole("option", {
      name: "Please choose a status",
    });
    const labelStatus = screen.getByLabelText("Status*");
    const inputDate = screen.getByLabelText("Date", {
      selector: "input",
    });
    const labelDate = screen.getByLabelText("Date");
    const inputAssignee = screen.getByLabelText("Assignee*", {
      selector: "input",
    });
    const labelAssignee = screen.getByLabelText("Assignee*");
    const inputAuthor = screen.getByLabelText("Author*", {
      selector: "input",
    });
    const labelAuthor = screen.getByLabelText("Author*");

    expect(inputTitle).toBeInTheDocument();
    expect(labelTitle).toBeInTheDocument();
    expect(inputStatus).toBeInTheDocument();
    expect(labelStatus).toBeInTheDocument();
    expect(inputDate).toBeInTheDocument();
    expect(labelDate).toBeInTheDocument();
    expect(inputAssignee).toBeInTheDocument();
    expect(labelAssignee).toBeInTheDocument();
    expect(inputAuthor).toBeInTheDocument();
    expect(labelAuthor).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(
      <SessionProvider>
        <TaskForm />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });

  it("renders delete button when a tasks is selected", () => {
    render(
      <SessionProvider>
        <TaskForm
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
      </SessionProvider>
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(deleteButton).toBeInTheDocument();
  });

  it("renders cancel button when a new task is created", () => {
    render(
      <SessionProvider>
        <TaskForm task={null} />
      </SessionProvider>
    );

    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    expect(cancelButton).toBeInTheDocument();
  });
});

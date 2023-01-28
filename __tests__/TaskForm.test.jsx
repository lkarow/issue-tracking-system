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
    const inputDescription = screen.getByRole("textbox", {
      name: "Description",
    });
    const labelDescription = screen.getByLabelText("Description");
    const inputStatus = screen.getByRole("combobox", {
      name: "Status*",
    });
    const labelStatus = screen.getByLabelText("Status*");
    const inputDate = screen.getByLabelText("Date", {
      selector: "input",
    });
    const labelDate = screen.getByLabelText("Date");
    const inputAssignee = screen.getByLabelText("Assignee", {
      selector: "input",
    });
    const labelAssignee = screen.getByLabelText("Assignee");
    const inputAuthor = screen.getByLabelText("Author*", {
      selector: "input",
    });
    const labelAuthor = screen.getByLabelText("Author*");

    expect(inputTitle).toBeInTheDocument();
    expect(labelTitle).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(labelDescription).toBeInTheDocument();
    expect(inputStatus).toBeInTheDocument();
    expect(labelStatus).toBeInTheDocument();
    expect(inputDate).toBeInTheDocument();
    expect(labelDate).toBeInTheDocument();
    expect(inputAssignee).toBeInTheDocument();
    expect(labelAssignee).toBeInTheDocument();
    expect(inputAuthor).toBeInTheDocument();
    expect(labelAuthor).toBeInTheDocument();
  });

  it("renders the data of the tasks", () => {
    render(
      <SessionProvider>
        <TaskForm
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

    const taskTitle = screen.getByLabelText("Title*", {
      selector: "input",
    }).value;
    const taskDescription = screen.getByRole("textbox", {
      name: "Description",
    }).value;
    const taskStatus = screen.getByRole("combobox", {
      name: "Status*",
    }).value;
    const taskDate = screen.getByLabelText("Date", {
      selector: "input",
    }).value;
    const taskAssignee = screen.getByLabelText("Assignee", {
      selector: "input",
    }).value;
    const taskAuthor = screen.getByLabelText("Author*", {
      selector: "input",
    }).value;

    expect(taskTitle).toBe("Test Title");
    expect(taskDescription).toBe("Test Description");
    expect(taskStatus).toBe("open");
    expect(taskDate).toBe("2023-01-01");
    expect(taskAssignee).toBe("Test Assignee");
    expect(taskAuthor).toBe("Test Author");
  });

  it("renders nothing in inputs if data of the task is empty", () => {
    render(
      <SessionProvider>
        <TaskForm
          task={{
            _id: "0",
            Title: "",
            Description: "",
            Status: "",
            Author: "",
            Assignee: "",
            Date: "",
          }}
        />
      </SessionProvider>
    );

    const taskTitle = screen.getByLabelText("Title*", {
      selector: "input",
    }).value;
    const taskDescription = screen.getByRole("textbox", {
      name: "Description",
    }).value;
    const taskStatus = screen.getByRole("combobox", {
      name: "Status*",
    }).value;
    const taskDate = screen.getByLabelText("Date", {
      selector: "input",
    }).value;
    const taskAssignee = screen.getByLabelText("Assignee", {
      selector: "input",
    }).value;
    const taskAuthor = screen.getByLabelText("Author*", {
      selector: "input",
    }).value;

    expect(taskTitle).toBe("");
    expect(taskDescription).toBe("");
    expect(taskStatus).toBe("");
    expect(taskDate).toBe("");
    expect(taskAssignee).toBe("");
    expect(taskAuthor).toBe("");
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
            Description: "Test Description",
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

import { render, screen } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TaskForm", () => {
  it("renders inputs and labels for title, description, status, date, assignee and author", async () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskForm />
      </SessionProvider>
    );

    const inputTitle = await screen.findByLabelText("Title*", {
      selector: "input",
    });
    const labelTitle = await screen.findByLabelText("Title*");
    const inputDescription = await screen.findByRole("textbox", {
      name: "Description",
    });
    const labelDescription = await screen.findByLabelText("Description");
    const inputStatus = await screen.findByRole("combobox", {
      name: "Status*",
    });
    const labelStatus = await screen.findByLabelText("Status*");
    const inputDate = await screen.findByLabelText("Date", {
      selector: "input",
    });
    const labelDate = await screen.findByLabelText("Date");
    const inputAssignee = await screen.findByLabelText("Assignee", {
      selector: "input",
    });
    const labelAssignee = await screen.findByLabelText("Assignee");
    const inputAuthor = await screen.findByLabelText("Author*", {
      selector: "input",
    });
    const labelAuthor = await screen.findByLabelText("Author*");

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
      <SessionProvider session={{ user: { name: "Test User" } }}>
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

  it("doesn't render anything in the inputs execpt the logged in user as author if the task data is empty", () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskForm
          task={{
            _id: "0",
            Title: "",
            Description: "",
            Status: "",
            Author: "Test User",
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
    expect(taskAuthor).toBe("Test User");
  });

  it("renders the author input as disabled", () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskForm
          task={{
            _id: "0",
            Title: "",
            Description: "",
            Status: "",
            Author: "Test User",
            Assignee: "",
            Date: "",
          }}
        />
      </SessionProvider>
    );
    const inputAuthor = screen.getByLabelText("Author*", {
      selector: "input",
    });

    expect(inputAuthor).toHaveAttribute("disabled");
  });

  it("renders submit button", () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskForm />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });

  it("renders delete button but no cancel when a tasks is selected", async () => {
    render(
      <SessionProvider session={true}>
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

    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    const cancelButton = screen.queryByRole("button", { name: "Cancel" });

    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("renders cancel button but no delete button when a new task is created", async () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskForm task={null} />
      </SessionProvider>
    );

    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    const deleteButton = screen.queryByRole("button", { name: "Delete" });

    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import TaskModal from "../components/TaskModal";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TaskModal", () => {
  it("renders close button", () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskModal showModal={() => {}} />
      </SessionProvider>
    );

    const button = screen.getByRole("button", { name: "Close" });

    expect(button).toBeInTheDocument();
  });

  it("renders TaskForm", () => {
    render(
      <SessionProvider session={{ user: { name: "Test User" } }}>
        <TaskModal showModal={() => {}} />
      </SessionProvider>
    );

    const taskFormContent = screen.getByLabelText("Title*");

    expect(taskFormContent).toBeInTheDocument();
  });
});

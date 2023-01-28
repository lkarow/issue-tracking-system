import { render, screen, waitFor } from "@testing-library/react";
import TaskList from "../components/TaskList";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";

describe("TaskList", () => {
  it("renders renders table", async () => {
    fetch.mockResponse(JSON.stringify([]));
    render(
      <SessionProvider>
        <TaskList />
      </SessionProvider>
    );

    const loadingSpinner = await screen.findByText("Create Task");

    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders LoadingSpinner if loading", async () => {
    fetch.mockResponse(JSON.stringify([]));
    render(
      <SessionProvider>
        <TaskList />
      </SessionProvider>
    );

    const loadingSpinner = await screen.findByTestId("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
    // Otherwise the it block exits before the loading state disappears and data comes back, resulting in a “not wrapped in act” error
    await waitFor(() => {
      expect(loadingSpinner).not.toBeInTheDocument();
    });
  });
});

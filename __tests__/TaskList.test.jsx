import { render, screen, waitFor } from "@testing-library/react";
import TaskList from "../components/TaskList";
import "@testing-library/jest-dom";

describe("TaskList", () => {
  it("renders renders table", async () => {
    fetch.mockResponse(JSON.stringify([]));
    render(<TaskList />);

    const loadingSpinner = await screen.findByText("Create Task");

    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders LoadingSpinner if loading", async () => {
    fetch.mockResponse(JSON.stringify([]));
    render(<TaskList />);

    const loadingSpinner = await screen.findByTestId("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
    // Otherwise the it block exits before the loading state disappears and data comes back, resulting in a “not wrapped in act” error
    await waitFor(() => {
      expect(loadingSpinner).not.toBeInTheDocument();
    });
  });
});

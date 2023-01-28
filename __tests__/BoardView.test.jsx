import { render, screen, waitFor } from "@testing-library/react";
import BoardView from "../components/BoardView";
import "@testing-library/jest-dom";

describe("BoardView", () => {
  it("renders four columns", async () => {
    fetch.mockResponse(JSON.stringify([]));
    render(<BoardView />);

    const backlogColumn = await screen.findByText("Backlog");
    const progressColumn = await screen.findByText("In Progress");
    const reviewColumn = await screen.findByText("In Review");
    const doneColumn = await screen.findByText("Done");

    expect(backlogColumn).toBeInTheDocument();
    expect(progressColumn).toBeInTheDocument();
    expect(reviewColumn).toBeInTheDocument();
    expect(doneColumn).toBeInTheDocument();
  });

  it("renders LoadingSpinner if loading", async () => {
    fetch.mockResponse(JSON.stringify([]));
    render(<BoardView />);

    const loadingSpinner = await screen.findByTestId("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
    // Otherwise the it block exits before the loading state disappears and data comes back, resulting in a “not wrapped in act” error
    await waitFor(() => {
      expect(loadingSpinner).not.toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import TaskList from "../components/TaskList";
import "@testing-library/jest-dom";

describe("TaskList", () => {
  it("renders LoadingSpinner if loading", () => {
    fetch.mockResponse(JSON.stringify([]));

    render(<TaskList />);

    const loadingSpinner = screen.getByTestId("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
  });
});

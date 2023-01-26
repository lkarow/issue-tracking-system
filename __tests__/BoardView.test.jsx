import { render, screen } from "@testing-library/react";
import BoardView from "../components/BoardView";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("BoardView", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders LoadingSpinner if loading", () => {
    fetch.mockResponse(JSON.stringify([]));

    render(<BoardView />);

    const loadingSpinner = screen.getByTestId("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
  });
});

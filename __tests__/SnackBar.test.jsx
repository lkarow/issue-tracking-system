import { render, screen } from "@testing-library/react";
import SnackBar from "../components/SnackBar";
import "@testing-library/jest-dom";

describe("SnackBar", () => {
  it("renders info text if snackbar is activated", () => {
    render(
      <SnackBar
        showSnackBar={true}
        onCloseSnackBar={() => {}}
        infoText={"Info text"}
      />
    );

    const infoText = screen.getByText("Info text");

    expect(infoText).toBeInTheDocument();
  });

  it("renders no info text if snackbar is not activated", () => {
    render(
      <SnackBar
        showSnackBar={false}
        onCloseSnackBar={() => {}}
        infoText={"Info text"}
      />
    );

    const infoText = screen.queryByText("Info text");

    expect(infoText).not.toBeInTheDocument();
  });
});

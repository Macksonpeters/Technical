import { render, screen } from "@testing-library/react";
import Card from "../components/common/cards/card";

it("should render correct properties, including sub heading text, value and background color", () => {
  render(
    <Card
      text="Transaction Count"
      backgroundColor="bg-white"
      value={123}
      pending={false}
      error={false}
    />
  );

  const subHeading = screen.getByText(/Count/i);
  expect(subHeading).toBeInTheDocument();

  const valueElement = screen.getByText(/123/);
  expect(valueElement).toBeInTheDocument();

  const cardElement = screen.getByTestId("card");
  expect(cardElement).toHaveClass("bg-white");
});

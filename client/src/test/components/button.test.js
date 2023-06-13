import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../components/Button";

test("test button", async () => {
  render(<Button />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

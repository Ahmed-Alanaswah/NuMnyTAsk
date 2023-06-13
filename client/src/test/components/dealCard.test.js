import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DealCard from "../../components/DealCard";
import AuthProvider from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("test deal card", async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <DealCard />
      </AuthProvider>
    </BrowserRouter>
  );
  const dealCardElement = screen.getByTestId("deal-card");
  expect(dealCardElement).toBeInTheDocument();
});

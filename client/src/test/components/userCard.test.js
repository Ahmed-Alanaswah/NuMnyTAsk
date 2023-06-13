import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "../../components/UserCard";
import AuthProvider from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("test user card", async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <UserCard />
      </AuthProvider>
    </BrowserRouter>
  );
  const userCardElement = screen.getByTestId("user-card");
  expect(userCardElement).toBeInTheDocument();
});

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthProvider from "../../context/AuthContext";
import Pagination from "../../components/Pagination";
import { BrowserRouter } from "react-router-dom";

test("test pagination", async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Pagination />
      </AuthProvider>
    </BrowserRouter>
  );
  const paginationElement = screen.getByTestId("pagination");
  expect(paginationElement).toBeInTheDocument();
});

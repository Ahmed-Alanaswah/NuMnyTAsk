import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ClaimedDealsCard from "../../components/ClaimedDealsCard";

test("test claim deal card", async () => {
  render(<ClaimedDealsCard />);
  const claimDealElementElement = screen.getByTestId("claim-deal-card");
  expect(claimDealElementElement).toBeInTheDocument();
});

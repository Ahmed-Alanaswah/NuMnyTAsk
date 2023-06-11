import axios from "axios";

export const claimedDealServices = {
  createDeal: async (data) =>
    await axios.post("http://localhost:3000/api/claim-deals", data, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }),

  getClaimedDeals: async () =>
    await axios.get("http://localhost:3000/api/claim-deals"),

  claimDeal: async (dealId, userId) =>
    axios.post("http://localhost:3000/api/claim-deals", {
      UserId: userId,
      DealId: dealId,
    }),
};

import axios from "axios";

export const dealServices = {
  createDeal: async (data) =>
    await axios.post("http://localhost:3000/api/deals", data, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }),

  getDeals: async () => await axios.get("http://localhost:3000/api/deals"),

  update: async (dealId, data) =>
    await axios.get(`http://localhost:3000/api/deals/${dealId}`, data),
};

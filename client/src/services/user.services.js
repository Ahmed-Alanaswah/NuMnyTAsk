import axios from "axios";

export const userServices = {
  createUser: async (data) =>
    await axios.post("http://localhost:3000/api/users", data, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }),
};

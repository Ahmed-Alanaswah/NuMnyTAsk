import axios from "axios";

export const loginService = {
  login: async (data) =>
    await axios.post("http://localhost:3000/api/auth", data),
};

import axios from "axios";

export const userServices = {
  createUser: async (data) =>
    await axios.post("http://localhost:3000/api/users", data, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }),

  getUsers: async () =>
    await axios.get("http://localhost:3000/api/users", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }),
  getUser: async (id) =>
    await axios.get(`http://localhost:3000/api/users/${id}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    }),
  delete: async (selectedUsers) =>
    await axios.delete("http://localhost:3000/api/users", {
      data: { idsList: selectedUsers },
    }),

  upload: async (userId, formData) =>
    await axios.put(`http://localhost:3000/api/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  update: async (userId, data) =>
    await axios.put(`http://localhost:3000/api/users/${userId}`, data),
  patch: async (userId, data) =>
    await axios.patch(`http://localhost:3000/api/users/${userId}`, data),
};

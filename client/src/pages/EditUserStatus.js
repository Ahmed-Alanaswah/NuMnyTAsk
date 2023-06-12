import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userServices } from "../services/user.services";
import { getQueryParam } from "../helpers/helpers";

const EditUserStatus = () => {
  const userId = getQueryParam("userId");
  const [newStatus, setNewStatus] = useState("");

  const navigate = useNavigate();

  const handleStatusChange = (e) => setNewStatus(e.target.value);

  console.log(newStatus);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await userServices.update(userId, { status: newStatus });
      navigate(`/users`);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Edit User Status:</label>
        <select value={newStatus} name="status" onChange={handleStatusChange}>
          <option value="Active">Active</option>
          <option value="In Active">In Active</option>
          <option value="Delete">Delete</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUserStatus;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dealServices } from "../services/deal.services";
import { getQueryParam } from "../helpers/helpers";

const EditDealStatus = () => {
  const dealId = getQueryParam("dealId");
  const [newStatus, setNewStatus] = useState("");
  console.log(newStatus);
  const navigate = useNavigate();

  const handleStatusChange = (e) => setNewStatus(e.target.value);

  console.log(newStatus);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dealServices.update(dealId, { status: newStatus });
      navigate(`/deals`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Edit deal Status:</label>
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

export default EditDealStatus;

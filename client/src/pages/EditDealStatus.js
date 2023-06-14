import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dealServices } from "../services/deal.services";
import { getQueryParam } from "../helpers/helpers";
import styles from "../styles/editPage.module.css";
import Button from "../components/Button";

const EditDealStatus = () => {
  const dealId = getQueryParam("dealId");
  const userId = getQueryParam("userId");
  const [newStatus, setNewStatus] = useState("Active");
  const navigate = useNavigate();

  const handleStatusChange = (e) => setNewStatus(e.target.value);

  console.log(newStatus);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dealServices.update(dealId, { status: newStatus });
      navigate(`/deals?userId=${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editPage}>
      <div>
        <h4>Edit deal Status:</h4>
        <select value={newStatus} name="status" onChange={handleStatusChange}>
          <option value="Active">Active</option>
          <option value="In Active">In Active</option>
          <option value="Delete">Delete</option>
          <option value="Expired">Expired</option>
        </select>
      </div>
      <Button type="submit">Update</Button>
    </form>
  );
};

export default EditDealStatus;

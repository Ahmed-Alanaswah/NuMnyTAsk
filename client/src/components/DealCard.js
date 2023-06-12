import React, { useContext, useEffect } from "react";
import styles from "../styles/card.module.css";
import { AuthContext } from "../context/AuthContext";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

const DealCard = ({ deal, claimDealHandler }) => {
  const { user, setUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (token) {
        const user = jwt(token);
        setUser(user);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  return (
    <div className={styles.card} key={deal?.id}>
      <div>name: {deal?.name}</div>
      <div>description: {deal?.description}</div>
      <div>amount: {deal?.amount}</div>
      <div>currency: {deal?.currency}</div>
      <div>status: {deal?.status}</div>
      <button onClick={() => claimDealHandler(deal?.id)}>claim deal </button>
      {user?.isAdmin && (
        <button onClick={() => navigate(`/deal-status?dealId=${deal?.id}`)}>
          edit status
        </button>
      )}
    </div>
  );
};

export default DealCard;

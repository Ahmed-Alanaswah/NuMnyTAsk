import React, { useContext, useEffect } from "react";
import styles from "../styles/card.module.css";
import { AuthContext } from "../context/AuthContext";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

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
    <div data-testid="deal-card" className={styles.card} key={deal?.id}>
      <div>name: {deal?.name}</div>
      <div>description: {deal?.description}</div>
      <div>amount: {deal?.amount}</div>
      <div>currency: {deal?.currency}</div>
      <div>status: {deal?.status}</div>
      <Button onClick={() => claimDealHandler(deal?.id)}>claim deal </Button>
      {user?.isAdmin && (
        <Button
          onClick={() =>
            navigate(`/deal-status?dealId=${deal?.id}&userId=${user?.id}`)
          }
        >
          edit status
        </Button>
      )}
    </div>
  );
};

export default DealCard;

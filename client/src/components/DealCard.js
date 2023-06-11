import React from "react";
import styles from "../styles/card.module.css";

const DealCard = ({ deal, claimDealHandler }) => {
  return (
    <div className={styles.card} key={deal?.id}>
      <div>name: {deal?.name}</div>
      <div>description: {deal?.description}</div>
      <div>amount: {deal?.amount}</div>
      <div>currency: {deal?.currency}</div>
      <div>status: {deal?.status}</div>
      <button onClick={() => claimDealHandler(deal?.id)}>claim deal </button>
    </div>
  );
};

export default DealCard;

import React from "react";
import styles from "../styles/card.module.css";

const ClaimedDealsCard = ({ claimedDeal }) => {
  return (
    <div className={styles.card} key={claimedDeal?.id}>
      <div>userId: {claimedDeal?.UserId}</div>
      <div>dealId: {claimedDeal?.DealId}</div>
      <div>amount: {claimedDeal?.Deal?.amount}</div>
      <div>currency: {claimedDeal?.Deal?.currency}</div>
      <div>status: {claimedDeal?.Deal?.status}</div>
    </div>
  );
};

export default ClaimedDealsCard;

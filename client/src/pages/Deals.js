import React, { useEffect, useState } from "react";
import styles from "../styles/card.module.css";
import { dealServices } from "../services/deal.services";
import { claimedDealServices } from "../services/claimedDeals.services";
import DealCard from "../components/DealCard";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const userId = new URLSearchParams(document.location.search).get("userId");

  const claimDealHandler = async (dealId) => {
    const res = await claimedDealServices.claimDeal(dealId, userId);

    console.log(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dealServices.getDeals();
        setDeals(res?.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.cardsContainer}>
      {deals.map((deal) => (
        <DealCard
          claimDealHandler={claimDealHandler}
          key={deal?.id}
          deal={deal}
        />
      ))}
    </div>
  );
};

export default Deals;

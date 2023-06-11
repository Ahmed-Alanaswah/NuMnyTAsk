import React, { useEffect, useState } from "react";
import styles from "../styles/card.module.css";
import { claimedDealServices } from "../services/claimedDeals.services";
import ClaimedDealsCard from "../components/ClaimedDealsCard";

const ClaimedDeals = () => {
  const [claimedDeals, setClaimedDeals] = useState([]);

  const [searchedData, setSearchedData] = useState(claimedDeals);
  const [searchValue, setSearchedValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await claimedDealServices.getClaimedDeals();
        setClaimedDeals(res.data);
        setSearchedData(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = searchedData.filter(
      (claimDeal) => claimDeal.UserId == searchValue
    );
    if (searchValue.length) {
      setSearchedData(filterData);
    } else {
      setSearchedData(claimedDeals);
    }
  }, [searchValue]);

  return (
    <>
      <input
        type="text"
        placeholder="search by userId.."
        value={searchValue}
        onChange={(e) => setSearchedValue(e.target.value)}
      />
      <div className={styles.cardsContainer}>
        {searchedData.map((claimedDeal) => (
          <ClaimedDealsCard key={claimedDeal?.id} claimedDeal={claimedDeal} />
        ))}
      </div>
    </>
  );
};

export default ClaimedDeals;

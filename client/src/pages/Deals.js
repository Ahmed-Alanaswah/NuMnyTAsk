import React, { useEffect, useState } from "react";
import styles from "../styles/card.module.css";
import { dealServices } from "../services/deal.services";
import { claimedDealServices } from "../services/claimedDeals.services";
import DealCard from "../components/DealCard";
import { getQueryParam } from "../helpers/helpers";
import Pagination from "../components/Pagination";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const userId = getQueryParam("userId");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const claimDealHandler = async (dealId) =>
    await claimedDealServices.claimDeal(dealId, userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dealServices.getDeals();
        setDeals(res?.data);
        const totalPages = Math.ceil(res?.data.length / 10);
        setCurrentPage(1);
        setTotalPages(totalPages);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const visibleDeals = deals.slice(startIndex, endIndex);

  return deals?.length == 0 ? (
    <div>No deals available.</div>
  ) : (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      <div className={styles.cardsContainer}>
        {visibleDeals.map((deal) => (
          <DealCard
            claimDealHandler={claimDealHandler}
            key={deal?.id}
            deal={deal}
          />
        ))}
      </div>
    </Pagination>
  );
};

export default Deals;

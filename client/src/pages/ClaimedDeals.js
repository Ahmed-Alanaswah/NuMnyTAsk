import React, { useEffect, useState } from "react";
import styles from "../styles/card.module.css";
import { claimedDealServices } from "../services/claimedDeals.services";
import ClaimedDealsCard from "../components/ClaimedDealsCard";
import Pagination from "../components/Pagination";

const ClaimedDeals = () => {
  const [claimedDeals, setClaimedDeals] = useState([]);

  const [searchedData, setSearchedData] = useState(claimedDeals);
  const [searchValue, setSearchedValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  // const [visibleData, setVisibleData] = useState([]);
  const visibleData = claimedDeals?.slice(startIndex, endIndex);

  // const visibleClaimDealsHandler = (data) => {
  //   const claimData = data?.slice(startIndex, endIndex);
  //   setVisibleData(claimData);
  // };

  console.log("============", visibleData);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await claimedDealServices.getClaimedDeals();
        const totalPages = Math.ceil(res?.data.length / 10);
        setCurrentPage(1);
        setTotalPages(totalPages);
        setClaimedDeals(res.data);
        setSearchedData(res.data);
        // visibleClaimDealsHandler(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue.length) {
      const filterData = visibleData.filter(
        (claimDeal) => claimDeal.UserId == searchValue
      );

      setSearchedData(filterData);
      // visibleClaimDealsHandler(filterData);
    } else {
      setSearchedData(claimedDeals);
      // visibleClaimDealsHandler(claimedDeals);
    }
  }, [searchValue]);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="search by userId.."
          value={searchValue}
          onChange={(e) => setSearchedValue(e.target.value)}
        />
      </div>

      <div className={styles.cardsContainer}>
        {searchedData?.map((claimedDeal) => (
          <ClaimedDealsCard key={claimedDeal?.id} claimedDeal={claimedDeal} />
        ))}
      </div>
    </Pagination>
  );
};

export default ClaimedDeals;

import React from "react";
import styles from "../styles/pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange, children }) => {
  // Other necessary state variables
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      {children}
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";
import styles from "../styles/pagination.module.css";
import Button from "./Button";

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
    <div data-testid="pagination">
      {children}
      <div className={styles.pagination}>
        <Button style={{ borderRadius: "30px" }} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button style={{ borderRadius: "30px" }} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

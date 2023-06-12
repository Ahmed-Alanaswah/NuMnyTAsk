import React, { useEffect, useState } from "react";
import styles from "../styles/card.module.css";
import { userServices } from "../services/user.services";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const visibleUsers = users?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (e, userId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const deleteUsers = async () => {
    await userServices.delete(selectedUsers);

    setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userServices.getUsers();
        const totalPages = Math.ceil(res?.data.length / 10);
        setCurrentPage(1);
        setTotalPages(totalPages);
        setUsers(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  return users?.length === 0 ? (
    <div>No users available.</div>
  ) : (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      <div className={styles.cardsContainer}>
        {visibleUsers.map((user) => (
          <UserCard
            key={user?.id}
            user={user}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      <button onClick={deleteUsers} className={styles.deleteButton}>
        delete users
      </button>
    </Pagination>
  );
};

export default Users;

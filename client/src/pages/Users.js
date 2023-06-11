import React, { useEffect, useState } from "react";
import styles from "../styles/card.module.css";
import { userServices } from "../services/user.services";
import UserCard from "../components/UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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
        setUsers(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.cardsContainer}>
        {users.map((user) => (
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
    </>
  );
};

export default Users;

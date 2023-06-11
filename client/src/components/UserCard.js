import React, { useState } from "react";
import styles from "../styles/card.module.css";

const UserCard = ({ user, handleCheckboxChange }) => {
  return (
    <div className={styles.card} key={user?.id}>
      <input
        type="checkbox"
        onChange={(event) => handleCheckboxChange(event, user?.id)}
      />
      <img
        src={user?.image || "https://placehold.jp/150x150.png"}
        alt="image"
      />
      <div>name: {user?.name}</div>
      <div>email: {user?.email}</div>
      <div>date birth: {user?.dateOfBirth}</div>
      <div>gender: {user?.gender}</div>
      <div>phone:{user?.phone}</div>
      <div>status: {user?.status}</div>
    </div>
  );
};

export default UserCard;

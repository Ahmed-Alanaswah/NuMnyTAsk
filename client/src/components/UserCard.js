import React, { useState } from "react";
import styles from "../styles/card.module.css";
import { image } from "../helpers/helpers";

const UserCard = ({ user, handleCheckboxChange }) => {
  return (
    <div className={styles.card} key={user?.id}>
      <input
        type="checkbox"
        onChange={(event) => handleCheckboxChange(event, user?.id)}
      />
      <img
        style={{ width: "150px", heigh: "150px" }}
        src={image(user)}
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

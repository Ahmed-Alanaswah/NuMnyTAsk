import React, { useContext, useEffect } from "react";
import styles from "../styles/card.module.css";
import { image } from "../helpers/helpers";
import { AuthContext } from "../context/AuthContext";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const UserCard = ({ userInfo, handleCheckboxChange }) => {
  const { user, setUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (token) {
        const user = jwt(token);
        setUser(user);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [token]);

  return (
    <div data-testid="user-card" className={styles.card} key={user?.id}>
      <input
        type="checkbox"
        onChange={(event) => handleCheckboxChange(event, userInfo?.id)}
      />
      <img
        style={{ width: "150px", heigh: "150px" }}
        src={image(userInfo)}
        alt="image"
      />
      <div>name: {userInfo?.name}</div>
      <div>email: {userInfo?.email}</div>
      <div>date birth: {userInfo?.dateOfBirth}</div>
      <div>gender: {userInfo?.gender}</div>
      <div>phone:{userInfo?.phone}</div>
      <div>status: {userInfo?.status}</div>
      {user?.isAdmin && (
        <Button onClick={() => navigate(`/edit-status?userId=${userInfo?.id}`)}>
          edit status
        </Button>
      )}
    </div>
  );
};

export default UserCard;

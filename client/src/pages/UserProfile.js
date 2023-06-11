import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userServices } from "../services/user.services";
import styles from "../styles/profile.module.css";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userServices.getUser(id);
        setUser(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={styles.card} key={user?.id}>
      <img
        className={styles.image}
        src={
          user.image
            ? user.image.replace("images", "http://localhost:3000")
            : "https://placehold.jp/300x300.png"
        }
        alt="image"
      />
      <div>name: {user?.name}</div>
      <div>email: {user?.email}</div>
      <div>date birth: {user?.dateOfBirth}</div>
      <div>gender: {user?.gender}</div>
      <div>phone:{user?.phone}</div>
      <div>status: {user?.status}</div>

      <button
        type="submit"
        onClick={() => navigate(`/upload?userId=${user?.id}`)}
      >
        Upload
      </button>
    </div>
  );
};

export default UserProfile;

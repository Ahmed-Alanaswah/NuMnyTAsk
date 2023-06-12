import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userServices } from "../services/user.services";
import styles from "../styles/profile.module.css";
import { image } from "../helpers/helpers";
import { claimedDealServices } from "../services/claimedDeals.services";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [countClaimDeal, setCountClaimDeal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userServices.getUser(id);
        const ClaimDeals = await claimedDealServices.getClaimedDeals();

        const filterClaimDeals = ClaimDeals?.data?.filter(
          (claim) => claim.UserId == id
        );

        const totalAmountHandler = filterClaimDeals.reduce(
          (acc, claim) => acc + +claim?.Deal?.amount,
          0
        );

        setTotalAmount(totalAmountHandler);
        setCountClaimDeal(filterClaimDeals?.length);
        setUser(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.card} key={user?.id}>
      <img className={styles.image} src={image(user)} alt="image" />
      <div>name: {user?.name}</div>
      <div>email: {user?.email}</div>
      <div>date birth: {user?.dateOfBirth}</div>
      <div>gender: {user?.gender}</div>
      <div>phone:{user?.phone}</div>
      <div>status: {user?.status}</div>
      <div>count claim deal: {countClaimDeal}</div>
      <div>total amount: {totalAmount} </div>

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

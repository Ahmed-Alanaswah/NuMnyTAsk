import React, { useContext, useEffect } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/header.module.css";
import { AuthContext } from "../context/AuthContext";
import jwt from "jwt-decode";
import { userServices } from "../services/user.services";

const Header = () => {
  const { user, setUser, isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const date = new Date(Date.now());

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/login");
      await userServices.update(user?.id, { lastLoginDateTime: date });
    } catch (error) {
      console.error(error);
    }
  };

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
    <div className={styles.header}>
      <div>
        {isLogin ? (
          <div className={styles.links}>
            <Link to="/">Home</Link>
            {user?.isAdmin && (
              <>
                <Link to="/create-user">Create user</Link>
                <Link to="/users">Users</Link>
                <Link to="/claim-deals">Claimed Deals</Link>
                <Link to="/create-deals">Create Deals</Link>
              </>
            )}

            <Link to={`/deals?userId=${user?.id}`}>Deals</Link>
            <Link to={`/users/${user?.id}`}>Profile</Link>
            <button className={styles.logout} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <h3>{user.name}</h3>
    </div>
  );
};

export default Header;

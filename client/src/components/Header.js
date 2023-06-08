import React, { useContext, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import styles from "../styles/header.module.css";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(isLogin);
  console.log(user);
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <div className={styles.header}>
      <div>
        {isLogin ? (
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/create-user">Create user</Link>
            {user?.isAdmin && <Link to="/users">Users</Link>}
            <Link to="/deals">Deals</Link>
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

import React, { lazy, useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import jwt from "jwt-decode";
import ClaimedDeals from "../pages/ClaimedDeals";
import UserProfile from "../pages/UserProfile";
import UploadImage from "../pages/UploadImage";

const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const CreateUser = lazy(() => import("../pages/CreateUser"));
const Users = lazy(() => import("../pages/Users"));
const Deals = lazy(() => import("../pages/Deals"));

const RoutesContainer = () => {
  const { isLogin, setIsLogin, setUser } = useContext(AuthContext);
  console.log("===", isLogin);
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const user = jwt(token);
        setUser(user);
        if (user?.id) {
          console.log(user);
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      }
    } catch (error) {
      redirect("/login");
      console.error(error.message);
    }
  }, []);

  return (
    <div>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" exact element={<Home />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/claim-deals" element={<ClaimedDeals />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/upload" element={<UploadImage />} />
          </>
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
      </Routes>
    </div>
  );
};

export default RoutesContainer;

import React from "react";
import styles from "../styles/button.module.css";

const Button = ({ onClick, children, style }) => {
  return (
    <button className={`${styles.button}  ${style}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

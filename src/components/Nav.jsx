import React from "react";
import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const location = useLocation();
  const { cart } = useSelector((state) => state.user);

  return (
    <div className="Nav">
      <Link
        style={location.pathname === "/" ? { color: "#19abff" } : {}}
        to={"/"}
      >
        Home
      </Link>
      <Link
        style={location.pathname === "/account" ? { color: "#19abff" } : {}}
        to={"/account"}
      >
        Account
      </Link>
      <Link to={"/cart"} className="n-cart">
        <img
          src={`https://img.icons8.com/material-outlined/30/${
            location.pathname === "/cart" ? "19abff/" : "000000/"
          }shopping-cart--v1.png`}
          alt="add-shopping-cart"
        />
        <span style={location.pathname === "/cart" ? { color: "#ffffff" } : {}}>
          {cart?.products?.length ?? 0}
        </span>
      </Link>
    </div>
  );
};

export default Nav;

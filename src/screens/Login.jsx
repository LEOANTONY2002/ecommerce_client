import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart, updateUser } from "../redux/userSlice";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../config";

const Login = () => {
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    setError(null);
    const { data } = await axios.post(`${SERVER_BASE_URL}/user/login`, user);
    console.log(data);
    if (data?.status === "success") {
      dispatch(updateUser(data?.user));
      dispatch(updateCart(data?.cart));
      navigate("/");
    } else if (data?.status === "fail") {
      setError(data?.msg);
    }
  };

  return (
    <div className="Login">
      <div>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {error && <span>{error}</span>}
        <button onClick={() => login()}>Login</button>
        <p>
          Create a new account <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

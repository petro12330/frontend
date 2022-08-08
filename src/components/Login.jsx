import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "services/authServise";
import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Form } from "./Form";

const Login = () => {
  let navigate = useNavigate();

  const { isAuth } = useAuth();

  const handleLogin = async (username, password) => {
    try {
      const login = await AuthService.login({ username, password });
      localStorage.setItem("Token", login?.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Form title="sign in" handleClick={handleLogin} />;
};

export { Login };

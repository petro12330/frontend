import React, { Fragment } from "react";
import { Login } from "../components/Login";

export const LoginPage = () => {
  return (
    <Fragment>
      <h1>Login</h1>
      <div>
        <Login />
      </div>
    </Fragment>
  );
};

export default LoginPage;

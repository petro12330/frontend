import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { TableCompany } from "../components/TableCompany";

export const HomePage = () => {
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <h1>HomePage</h1>
      <TableCompany />
    </>
  );
};

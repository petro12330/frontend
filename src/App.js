import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import CompanyPage from "./pages/Company";
import NotFoundPage from "./pages/PageNottFound";

function App() {
  return (
    <div className="container pt-4">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/company/:uuid"} element={<CompanyPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

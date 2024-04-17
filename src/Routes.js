import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomePage from "./Pages/HomePage";
import Compose from "./components/MailComponent/Compose";
import Sent from "./components/MailComponent/Sent";
import Inbox from "./components/MailComponent/Inbox";
import EmailDetail from "./components/MailComponent/EmailDetail";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/compose" element={<Compose />}></Route>
        <Route path="/sent" element={<Sent />}></Route>
        <Route path="/inbox" element={<Inbox />}></Route>
        <Route path="emailDetail" element={<EmailDetail />}></Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;

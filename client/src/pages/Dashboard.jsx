import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Headers from "components/Header";


const Dashboard = () => {

  return (
    <>
      <Sidebar
        logo={{
          innerLink: "/pages/dashboard",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}/>
      <div className="main-content">
        <Headers />
        <UserNavbar />
 
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

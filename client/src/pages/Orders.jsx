import React, { useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Headers from "components/Header";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TableOrders from "layouts/TableOrders";


const Orders = (props) => {
  const {className} = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
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
        <TableOrders />

        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default Orders;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { Container } from "reactstrap";
import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Headers from "components/Header";
import TableUsers from "layouts/TableUsers";



const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "1") {
      navigate("/pages/dashboard");
    }
  }, [isError, user, navigate]);

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
        <TableUsers />
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default Users;

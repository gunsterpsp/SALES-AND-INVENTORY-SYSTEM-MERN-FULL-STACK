import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import {
    NavItem,
    NavLink,
    Nav,
  } from "reactstrap";


const Admin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const [users, setUsers] = useState("");

    useEffect(() => {
        dispatch(getMe());
      }, [dispatch]);
    
      useEffect(() => {
        setUsers(user)
        // if (isError) {
        //   navigate("/");
        // }
        // if (user && user.role === "1") {

        // }

      }, [isError, user, navigate]);

  return (
    <>  
            {users && users.role === "1" && (
                <Nav className="" navbar>
                <NavItem>
                    <NavLink href="/pages/users">
                    <i className="ni ni-spaceship" />
                    Users
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/pages/customers">
                    <i className="ni ni-spaceship" />
                    Customers List
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/pages/inventory">
                    <i className="ni ni-palette" />
                    Inventory
                    </NavLink>
                </NavItem>
                </Nav>
            )}
    </>
  )
}

export default Admin
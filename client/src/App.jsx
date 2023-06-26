import { BrowserRouter, Route, Routes } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Layout from "components/Layout";
import Dashboard from "pages/Dashboard";
import Orders from "pages/Orders";
import Users from "pages/Users";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";
import Profile from "pages/Profile";
import Customers from "pages/Customers";
import Items from "pages/Items";


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recover" element={<ForgotPassword />} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="/pages/orders" element={<Orders />} />
        <Route path="/pages/delivery" element={<Layout />} />
        <Route path="/pages/users" element={<Users />} />
        <Route path="/pages/profile" element={<Profile />} />
        <Route path="/pages/customers" element={<Customers />} />
        <Route path="/pages/inventory" element={<Items />} />
        
        
      </Routes>
    </BrowserRouter>
    </>

)
}

export default App

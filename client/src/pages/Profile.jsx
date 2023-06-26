import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Headers from "components/Header";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import ProfileUser from "layouts/ProfileUser";
// core components

const Profile = () => {
  return (
    <>
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
        <ProfileUser />
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </>
    </>
  );
};

export default Profile;

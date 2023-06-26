import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "../assets/css/styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/pages/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };


  return (
    <>
    <div className="main-parent">
      <br /><br /><br /><br />
      <Col lg="5" className="mx-auto">
        <Card className="bg-secondary shadow border-0 card-body">
          <CardBody className="px-lg-5 py-lg-5" >
            <div className="text-center mb-4">
              <h3>Welcome User</h3>
            </div>
            {isError && <p className="has-text-centered">{message}</p>}
            <Form role="form" onSubmit={Auth}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-user-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="" color="primary" type="submit">
                {isLoading ? "Loading..." : "Sign in"}
                </Button>
              </div>
            </Form>
            <Row className="mt-3">
              <Col xs="12">
              <label style={{fontSize: "13px"}}>Don't remember your password?{' '}<br/>
                    <NavLink to="/recover">Forgot Password</NavLink>
                  </label>
              </Col>
            </Row>
          </CardBody>
        </Card>

      </Col>
      </div>
    </>
  );
};

export default Login;

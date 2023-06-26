import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
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
  import axios from "axios";
  // core components
  
  const ProfileUser = () => {

    const { user } = useSelector((state) => state.auth);

    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    

    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");


    const onUpdate = async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const uuid = document.getElementById('uuid').value;

      await axios.patch(`http://localhost:8000/changeInfo/${uuid}`, {
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User information has been changed!',
            showConfirmButton: false,
            timer: 1500
        })


    }


    const onChangePassword = async (e) => {
        e.preventDefault();
        // const uuid = uuidUpdate;

        const uuid = document.getElementById('uuid').value;
        
        if(newPassword !== confPassword){
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Password and Confirm Password does not match!',
                showConfirmButton: false,
                timer: 1500
            })
        }else {

            await axios.patch(`http://localhost:8000/changeUserPassword/${uuid}`, {
            password: newPassword,
            confPassword: confPassword
            });
            setNewPassword("");
            setConfPassword("");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Password has been changed!',
                showConfirmButton: false,
                timer: 1500
            })
        }


        
    }

    return (
      <>
        {/* <UserHeader /> */}
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {user && user.firstname}{' '}{user && user.lastname}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={onUpdate}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={user && user.username} 
                              id="username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="email"
                              defaultValue={user && user.email} 
                              placeholder="user@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={user && user.firstname} 
                              id="firstname"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={user && user.lastname} 
                              id="lastname"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="" xs="4">
                            <Button
                            color="primary"
                            type="submit"
                            size="sm">
                            Update
                            </Button>
                        </Col>
                      </Row>
                    </div>
                    </Form>
                    
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">Security</h6>
                    <div className="pl-lg-4">
                    <Form role="form" onSubmit={onChangePassword}>
                    <input type="hidden" value={user && user.uuid} id="uuid"/>
                    <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Old Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={user && user.password}
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative" required
                              value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative" required
                              value={confPassword} onChange={(e) => setConfPassword(e.target.value)}
                              type="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="" xs="4">
                            <Button
                            color="primary"
                            type="submit"
                            size="sm">
                            Submit
                            </Button>
                        </Col>
                      </Row>
                      </Form>
                    </div>
                   
                    <hr className="my-4" />
                    {/* Description */}
                    {/* <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div> */}













                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default ProfileUser;
  
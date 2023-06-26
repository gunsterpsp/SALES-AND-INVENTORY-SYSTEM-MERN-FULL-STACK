import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {
    Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, 
    DropdownToggle, Pagination, PaginationItem, PaginationLink, Table, Container, 
    Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, 
    InputGroupText, Input} from "reactstrap";

  // core components

  
  const TableUsers = () => {
    const [modalCreate, setModalAdd] = useState(false);
    const [modalEdit, setModalUpdate] = useState(false);
  
    const modalAdd = () => setModalAdd(!modalCreate);
    const modalUpdate = () => setModalUpdate(!modalEdit);

    const [users, setUsers] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);
  
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    };

    const [search, setSearch] = useState("");
    const [value, setValue] = useState("");

    const onSearch = async (e) => {
      e.preventDefault();
      return await axios.get(`http://localhost:8000/users`)
    }


    const [uuidUpdate, setUUIDUpdate] = useState("");
    const [firstnameUpdate, setFirstNameUpdate] = useState("");
    const [lastnameUpdate, setLastNameUpdate] = useState("");
    const [usernameUpdate, setUsernameUpdate] = useState("");
    const [passwordUpdate, setPasswordUpdate] = useState("");
    const [confPasswordUpdate, setConfPasswordUpdate] = useState("");
    const [emailUpdate, setEmailUpdate] = useState("");
    const [roleUpdate, setRoleUpdate] = useState("");
    
    const viewUsers = async (uuid, firstname, lastname, 
      username, password, email, role) => {
      modalUpdate();
      setUUIDUpdate(uuid)
      setFirstNameUpdate(firstname)
      setLastNameUpdate(lastname)
      setUsernameUpdate(username)
      setPasswordUpdate(password)
      setConfPasswordUpdate(password)
      setEmailUpdate(email)
      setRoleUpdate(role)
    };

    const deleteUser = async (uuid) => {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'User has been deleted!',
            'success'
          )
          await axios.delete(`http://localhost:8000/users/${uuid}`);
          getUsers();
        }
      })
    };

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");


    const saveUser = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8000/users", {
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password,
          confPassword: confPassword,
          email: email,
          role: role,
        });
        getUsers();
        modalAdd();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
   
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setConfPassword("");
        setEmail("");
        setRole("");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const updateUser = async (e) => {
      e.preventDefault();
      const uuid = uuidUpdate;
      try {
        await axios.patch(`http://localhost:8000/users/${uuid}`, {
          firstname: firstnameUpdate,
          lastname: lastnameUpdate,
          username: usernameUpdate,
          password: passwordUpdate,
          confPassword: confPasswordUpdate,
          email: emailUpdate,
          role: roleUpdate,
        });
        getUsers();
        modalUpdate();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
   
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }

    const userActive = async (uuid) => {
      try {
        await axios.patch(`http://localhost:8000/users/active/${uuid}`);
        getUsers();
      } catch (error) {
        console.log(error)
      }
    }

    const userLock = async (uuid) => {
      try {
        await axios.patch(`http://localhost:8000/users/lock/${uuid}`);
        getUsers();
      } catch (error) {
        console.log(error)
      }
    }


    return (
      <>

        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <div className="row g-3">
                  
                  <div className="col-md-6">
                    <CardHeader className="border-0">
                      <Button color="primary" onClick={modalAdd}>
                      <i className="fa-regular fa-user"></i>{' '}Add User</Button>
                    </CardHeader>
                  </div>
                  <div className="col-md-2">
                  </div>
                  <div className="col-md-4">
                  <CardHeader className="border-0">
                  <form onSubmit={onSearch}>
                  <InputGroup>
                    <Input placeholder="Search..." value={value} 
                    onChange={(e) => (setValue(e.target.value))}/>
                    <InputGroupAddon addonType="append">
                      <Button color="primary" type="submit">
                      <i className="fa-solid fa-magnifying-glass"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  </form>
                  </CardHeader>
                  </div>
                </div>
                
              
                {/* Table Start */}
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {users.map((user, index) => (
                    <tr key={user.uuid}>
                      <td>{index + 1}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                      {user && user.status === "0" && (
                           <div className="custom-control custom-switch">
                           <input type="checkbox" className="custom-control-input"
                           onClick={(e) => userActive(user.uuid)} id="userActive" />
                           <label className="custom-control-label" 
                           htmlFor="userActive">Lock</label>
                           </div>
                      )}
                      {user && user.status === "1" && (
                           <div className="custom-control custom-switch">
                           <input type="checkbox" className="custom-control-input"
                           onClick={(e) => userLock(user.uuid)} id="userLock" />
                           <label className="custom-control-label" 
                           htmlFor="userLock">Active</label>
                           </div>
                      )}
                      {/* {user && user.status == 0 ? (
                        <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input"
                        onClick={(e) => userActive(user.uuid)} id="userActive" />
                        <label className="custom-control-label" 
                        htmlFor="userActive">Lock</label>
                        </div>
                      ): (
                        <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" checked
                         onClick={(e) => userLock(user.uuid)} id="userLock" />
                        <label className="custom-control-label" 
                        htmlFor="userLock">Active</label>
                      </div>
                      )} */}
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href=""
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href=""
                              onClick={(e) => viewUsers(user.uuid, user.firstname, user.lastname, 
                                user.username, user.password, user.email, user.role)} >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={() => deleteUser(user.uuid)} >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                {/* Table End */}
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href=""
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href=""
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href=""
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href=""
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Modal Add Start */}
          <Modal isOpen={modalCreate} toggle={modalAdd} className="">
              <ModalHeader toggle={modalAdd}>User Details</ModalHeader>
              <ModalBody>
                <form onSubmit={saveUser}>
                <div>
                  <label htmlFor="">First Name</label>
                  <input type="text" className="form-control" 
                                      value={firstname}
                                      onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Last Name</label>
                  <input type="text" className="form-control" 
                                      value={lastname}
                                      onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Username</label>
                  <input type="text" className="form-control" 
                                      value={username}
                                      onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input type="text" className="form-control" 
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Confirm Password</label>
                  <input type="text" className="form-control" 
                                      value={confPassword}
                                      onChange={(e) => setConfPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <input type="text" className="form-control" 
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Role</label>
                  <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} >
                  <option value="" disabled>Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
                </div>
                <ModalFooter>
                    <button className="btn btn-primary" type="submit">Create</button>
                </ModalFooter>
                </form>
              </ModalBody>
          </Modal>
          {/* Modal Add End*/}

          {/* Modal Update Start */}
          <Modal isOpen={modalEdit} toggle={modalUpdate} className="">
              <ModalHeader toggle={modalUpdate}>User Details</ModalHeader>
              <ModalBody>
              <form onSubmit={updateUser}>
                  <input type="hidden" className="form-control" 
                                      value={uuidUpdate}
                                      onChange={(e) => setUUIDUpdate(e.target.value)} />
                <div>
                  <label htmlFor="">First Name</label>
                  <input type="text" className="form-control" 
                                      value={firstnameUpdate}
                                      onChange={(e) => setFirstNameUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Last Name</label>
                  <input type="text" className="form-control" 
                                      value={lastnameUpdate}
                                      onChange={(e) => setLastNameUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Username</label>
                  <input type="text" className="form-control" 
                                      value={usernameUpdate}
                                      onChange={(e) => setUsernameUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input type="text" className="form-control" 
                                      value={passwordUpdate}
                                      onChange={(e) => setPasswordUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Confirm Password</label>
                  <input type="text" className="form-control" 
                                      value={confPasswordUpdate}
                                      onChange={(e) => setConfPasswordUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <input type="text" className="form-control" 
                                      value={emailUpdate}
                                      onChange={(e) => setEmailUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Role</label>
                  <select className="form-control" value={roleUpdate} onChange={(e) => setRoleUpdate(e.target.value)} >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
                </div>
                <ModalFooter>
                    <button className="btn btn-primary" type="submit">Create</button>
                </ModalFooter>
                </form>
              </ModalBody>
          </Modal>
          {/* Modal Update End*/}
        </Container>
      </>
    );
  };
  
  export default TableUsers;
  
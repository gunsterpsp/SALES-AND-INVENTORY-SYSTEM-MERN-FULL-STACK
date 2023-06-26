import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {
    Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, 
    DropdownToggle, Pagination, PaginationItem, PaginationLink, Table, Container, 
    Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, 
    InputGroupText, Input} from "reactstrap";
import DataTable from "react-data-table-component";

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
  


    const columns = [
      {
        name: "No",
        selector: (row) => row.id,
        sortable: true
      },
      {
        name: "First Name",
        selector: (row) => row.firstname,
        sortable: true
      },
      {
        name: "Last Name",
        selector: (row) => row.lastname,
        sortable: true
      },
      {
        name: "User Name",
        selector: (row) => row.username,
        sortable: true
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true
      },
      {
        name: "Role",
        selector: (row) => row.role_name,
        sortable: true
      },
      {
        name: "Status",
        cell: user => <label htmlFor="">
          {user && user.status_name == "Lock" ? ( 
          <label htmlFor="" className="text-danger">Lock</label>
        ): (
          <label htmlFor="" className="text-success">Active</label>
        )}
        </label>,
      },
      {
        name: "Action",
        cell: user => 
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
                                  <i className="fa-solid fa-pen-to-square"></i>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={() => deleteUser(user.uuid)} >
                                <i className="fa-solid fa-trash"></i>
                              Delete
                            </DropdownItem>
                            {user && user.status_name == "Lock" ? (
                                <DropdownItem
                                href=""
                                onClick={() => userActive(user.uuid)} >
                                  <i className="fa-solid fa-check"></i>
                                Activate
                              </DropdownItem>
                            ): (
                                <DropdownItem
                                href=""
                                onClick={() => userLock(user.uuid)} >
                                  <i className="fa-solid fa-lock"></i>
                                Lock
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
      }
      ]
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:8000/users/spGetAllUsers/value1/value2/value3/value4");
      setUsers(response.data[0])
    };

    const getRoles = async () => {
      const response = await axios.get("http://localhost:8000/roles/spGetAllRoles/value1/value2/value3/value4");
      setRoles(response.data[0])
    };

    const [roles, setRoles] = useState([]);

    useEffect(() => {
      getRoles();
    }, [])



    const resetUsers = async () => {
      const response = await axios.get("http://localhost:8000/users/spGetAllUsers/value1/value2/value3/value4");
      setUsers(response.data[0])
      setSearch("");
      let timerInterval
        Swal.fire({
          title: 'Loading...',
          html: 'Please wait in a moment',
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
        })
    };

    const [search, setSearch] = useState("");

    const onSearch = async (e) => {
      e.preventDefault();
      const response = await axios.get(`http://localhost:8000/users/spUsersSearch/${search}/value2/value3/value4`);
        setUsers(response.data[0])

        if(response.data[0].length == 0){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: ''+search+' not found!',
            showConfirmButton: false,
            timer: 1500
          })
        }else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: ''+search+' has found!',
            showConfirmButton: false,
            timer: 1500
          })
        }

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
        const response = await axios.get(`http://localhost:8000/rolebyId/spGetRoleById/${role}/value2/value3/value4`);
        setRoleId(response.data[0]);

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

    const [roleId, setRoleId] = useState([]);

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

      if(firstname == '' || lastname == '' || username == '' || 
      password == '' || confPassword == '' ||  email == '' ||  role == ''){
        Swal.fire(
          'Please complete all required details!',
          '',
          'info'
        )
      }

      if(password != confPassword){
        Swal.fire(
          'Password and Confirm Password does not match!',
          '',
          'info'
        )
      }

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
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'User has been activated!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error)
      }
    }

    const userLock = async (uuid) => {
      try {
        await axios.patch(`http://localhost:8000/users/lock/${uuid}`);
        getUsers();
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'User has been locked!',
          showConfirmButton: false,
          timer: 1500
        })
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
            
                  </CardHeader>
                  </div>
                </div>
                
              
                {/* Table Start */}
                <DataTable columns={columns} data={users} pagination title="Users" fixedHeader 
                fixedHeaderScrollHeight="400px" selectableRowsHighlight 
                highlightOnHover actions={<button className="btn btn-dark" onClick={resetUsers}>
                  <i className="fa-solid fa-arrows-rotate"></i></button>} 
                subHeader subHeaderComponent={<form onSubmit={onSearch}>
                <InputGroup>
                  <Input placeholder="Search..." value={search} required
                  onChange={(e) => (setSearch(e.target.value))}/>
                  <InputGroupAddon addonType="append">
                    <Button color="primary" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                </form>} />
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
                  <input type="password" className="form-control" 
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Confirm Password</label>
                  <input type="password" className="form-control" 
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
                  {roles.map(role => 
                    <option value={role.role_id}>{role.role_name}</option>)
                  }
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
                  {roleId.map(roleId => 
                      <option value={roleId.role_id}>{roleId.role_name}</option>)}
                  {roles.map(role => 
                    <option value={role.role_id}>{role.role_name}</option>)}
                </select>
                </div>
                <ModalFooter>
                    <button className="btn btn-primary" type="submit">Update</button>
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
  
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

  
  const TableCustomers = () => {

    const [modalCreate, setModalAdd] = useState(false);
    const [modalEdit, setModalUpdate] = useState(false);
  
    const modalAdd = () => setModalAdd(!modalCreate);
    const modalUpdate = () => setModalUpdate(!modalEdit);

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      getCustomers();
    }, []);
  


    const columns = [
      {
        name: "No",
        selector: (row) => row.customer_id,
        sortable: true
      },
      {
        name: "Customer Code",
        selector: (row) => row.customer_code,
        sortable: true
      },
      {
        name: "Customer Name",
        selector: (row) => row.customer_name,
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
        cell: customer => 
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
                              onClick={(e) => viewCustomers(customer.customer_id, 
                                customer.customer_code, customer.customer_name)} >
                                  <i className="fa-solid fa-pen-to-square"></i>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={() => deleteCustomer(customer.customer_id)} >
                                <i className="fa-solid fa-trash"></i>
                              Delete
                            </DropdownItem>
                            {customer && customer.status_name == "Lock" ? (
                                <DropdownItem
                                href=""
                                onClick={() => customerActive(customer.customer_id)} >
                                  <i className="fa-solid fa-check"></i>
                                Activate
                              </DropdownItem>
                            ): (
                                <DropdownItem
                                href=""
                                onClick={() => customerLock(customer.customer_id)} >
                                  <i className="fa-solid fa-lock"></i>
                                Lock
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
      }
      ]
  
    const getCustomers = async () => {
      const response = await axios.get("http://localhost:8000/customers/spGetAllCustomers/value1/value2/value3/value4");
      setCustomers(response.data[0])
    };

    const getRoles = async () => {
      const response = await axios.get("http://localhost:8000/roles/spGetAllRoles/value1/value2/value3/value4");
      setRoles(response.data[0])
    };

    const [roles, setRoles] = useState([]);

    useEffect(() => {
      getRoles();
    }, [])



    const resetCustomers = async () => {
      const response = await axios.get("http://localhost:8000/customers/spGetAllCustomers/value1/value2/value3/value4");
      setCustomers(response.data[0])
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
      const response = await axios.get(`http://localhost:8000/customers/spCustomersSearch/${search}/value2/value3/value4`);
      
        setCustomers(response.data[0])

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


    const [cidUpdate, setCIDUpdate] = useState("");
    const [customer_codeUpdate, setCustomerCodeUpdate] = useState("");
    const [customer_nameUpdate, setCustomerNameUpdate] = useState("");

    
    const viewCustomers = async (customer_id, customer_code, customer_name) => {
        // const response = await axios.get(`http://localhost:8000/rolebyId/spGetRoleById/${role}/value2/value3/value4`);
        // setRoleId(response.data[0]);

      console.log({customer_id, customer_code, customer_name})
      
      modalUpdate();
      setCIDUpdate(customer_id)
      setCustomerCodeUpdate(customer_code)
      setCustomerNameUpdate(customer_name)

    };

    const [roleId, setRoleId] = useState([]);

    const deleteCustomer = async (customer_id) => {

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
            'Customer has been deleted!',
            'success'
          )
          await axios.delete(`http://localhost:8000/customers/${customer_id}`);
          getCustomers();
        }
      })
    };

    const [customer_code, setCustomerCode] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [msg, setMsg] = useState("");


    const saveCustomer = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8000/customers", {
          customer_code: customer_code,
          customer_name: customer_name,
        });
        getCustomers();
        modalAdd();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Customer has been added!',
          showConfirmButton: false,
          timer: 1500
        })
   
        setCustomerCode("");
        setCustomerName("");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const updateCustomer = async (e) => {
      e.preventDefault();
      const customer_id = cidUpdate;
      try {
        await axios.patch(`http://localhost:8000/customers/${customer_id}`, {
          customer_code: customer_codeUpdate,
          customer_name: customer_nameUpdate,
        });
        getCustomers();
        modalUpdate();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Customer has been updated!',
          showConfirmButton: false,
          timer: 1500
        })
   
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }

    const customerActive = async (customer_id) => {
      try {
        await axios.patch(`http://localhost:8000/customers/active/${customer_id}`);
        getCustomers();
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'Customer has been activated!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error)
      }
    }

    const customerLock = async (customer_id) => {
      try {
        await axios.patch(`http://localhost:8000/customers/lock/${customer_id}`);
        getCustomers();
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'Customer has been locked!',
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
                      <i className="fa-regular fa-user"></i>{' '}Add Customer</Button>
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
                <DataTable columns={columns} data={customers} pagination title="Customers" fixedHeader 
                fixedHeaderScrollHeight="400px" selectableRowsHighlight 
                highlightOnHover actions={<button className="btn btn-dark" onClick={resetCustomers}>
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
              <ModalHeader toggle={modalAdd}>Customer Details</ModalHeader>
              <ModalBody>
                <form onSubmit={saveCustomer}>
                <div>
                  <label htmlFor="">Customer Code</label>
                  <input type="text" className="form-control" 
                                      value={customer_code}
                                      onChange={(e) => setCustomerCode(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Customer Name</label>
                  <input type="text" className="form-control" 
                                      value={customer_name}
                                      onChange={(e) => setCustomerName(e.target.value)} />
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
              <ModalHeader toggle={modalUpdate}>Customer Details</ModalHeader>
              <ModalBody>
              <form onSubmit={updateCustomer}>
                  <input type="hidden" className="form-control" 
                                      value={cidUpdate}
                                      onChange={(e) => setCIDUpdate(e.target.value)} />
                <div>
                  <label htmlFor="">Customer Code</label>
                  <input type="text" className="form-control" 
                                      value={customer_codeUpdate}
                                      onChange={(e) => setCustomerCodeUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Customer Name</label>
                  <input type="text" className="form-control" 
                                      value={customer_nameUpdate}
                                      onChange={(e) => setCustomerNameUpdate(e.target.value)} />
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
  
  export default TableCustomers;
  
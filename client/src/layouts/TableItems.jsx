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

  
  const TableItems = () => {

    const [modalCreate, setModalAdd] = useState(false);
    const [modalEdit, setModalUpdate] = useState(false);
  
    const modalAdd = () => setModalAdd(!modalCreate);
    const modalUpdate = () => setModalUpdate(!modalEdit);

    const [items, setItems] = useState([]);

    useEffect(() => {
      getItems();
    }, []);
  


    const columns = [
      {
        name: "No",
        selector: (row) => row.item_id,
        sortable: true
      },
      {
        name: "Item Code",
        selector: (row) => row.item_code,
        sortable: true
      },
      {
        name: "Item Name",
        selector: (row) => row.item_name,
        sortable: true
      },
      {
        name: "Quantity",
        selector: (row) => row.item_quantity,
        sortable: true
      },
      {
        name: "Status",
        cell: item => <label htmlFor="">
          {item && item.status_name == "Lock" ? ( 
          <label htmlFor="" className="text-danger">Lock</label>
        ): (
          <label htmlFor="" className="text-success">Active</label>
        )}
        </label>,
      },
      {
        name: "Action",
        cell: item => 
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
                              onClick={(e) => viewItems(item.item_id, 
                                item.item_code, item.item_name)} >
                                  <i className="fa-solid fa-pen-to-square"></i>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href=""
                              onClick={() => deleteItem(item.item_id)} >
                                <i className="fa-solid fa-trash"></i>
                              Delete
                            </DropdownItem>
                            {item && item.status_name == "Lock" ? (
                                <DropdownItem
                                href=""
                                onClick={() => itemActive(item.item_id)} >
                                  <i className="fa-solid fa-check"></i>
                                Activate
                              </DropdownItem>
                            ): (
                                <DropdownItem
                                href=""
                                onClick={() => itemLock(item.item_id)} >
                                  <i className="fa-solid fa-lock"></i>
                                Lock
                              </DropdownItem>
                            )}
                          </DropdownMenu>
                        </UncontrolledDropdown>
      }
      ]
  
    const getItems = async () => {
      const response = await axios.get("http://localhost:8000/items/spGetAllItems/value1/value2/value3/value4");
      setItems(response.data[0])
    };

    const getRoles = async () => {
      const response = await axios.get("http://localhost:8000/roles/spGetAllRoles/value1/value2/value3/value4");
      setRoles(response.data[0])
    };

    const [roles, setRoles] = useState([]);

    useEffect(() => {
      getRoles();
    }, [])



    const resetItems = async () => {
      const response = await axios.get("http://localhost:8000/items/spGetAllItems/value1/value2/value3/value4");
      setItems(response.data[0])
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
      const response = await axios.get(`http://localhost:8000/items/spItemsSearch/${search}/value2/value3/value4`);
      
        setItems(response.data[0])

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


    const [itemUpdateId, setItemId] = useState("");
    const [item_codeUpdate, setItemCodeUpdate] = useState("");
    const [item_nameUpdate, setItemNameUpdate] = useState("");

    
    const viewItems = async (item_id, item_code, item_name) => {
        // const response = await axios.get(`http://localhost:8000/rolebyId/spGetRoleById/${role}/value2/value3/value4`);
        // setRoleId(response.data[0]);

      console.log({item_id, item_code, item_name})
      
      modalUpdate();
      setItemId(item_id)
      setItemCodeUpdate(item_code)
      setItemNameUpdate(item_name)

    };

    const [roleId, setRoleId] = useState([]);

    const deleteItem = async (customer_id) => {

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
          getItems();
        }
      })
    };

    const [item_code, setItemCode] = useState("");
    const [item_name, setItemName] = useState("");
    const [item_quantity, setItemQuantity] = useState("");
    const [msg, setMsg] = useState("");


    const saveItem = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:8000/items", {
          item_code: item_code,
          item_name: item_name,
          item_quantity: item_quantity
        });
        getItems();
        modalAdd();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item has been added!',
          showConfirmButton: false,
          timer: 1500
        })
   
        setItemCode("");
        setItemName("");
        setItemQuantity("");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const updateItem = async (e) => {
      e.preventDefault();
      const item_id = itemUpdateId;
      try {
        await axios.patch(`http://localhost:8000/items/${item_id}`, {
          item_code: item_codeUpdate,
          item_name: item_nameUpdate,
        });
        getItems();
        modalUpdate();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Item has been updated!',
          showConfirmButton: false,
          timer: 1500
        })
   
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }

    const itemActive = async (item_id) => {
      try {
        await axios.patch(`http://localhost:8000/items/active/${item_id}`);
        getItems();
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'Item has been activated!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error)
      }
    }

    const itemLock = async (item_id) => {
      try {
        await axios.patch(`http://localhost:8000/items/lock/${item_id}`);
        getItems();
        Swal.fire({
          allowOutsideClick: false,
          position: 'center',
          icon: 'success',
          title: 'Item has been locked!',
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
                      <i className="fa-regular fa-user"></i>{' '}Add Items</Button>
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
                <DataTable columns={columns} data={items} pagination title="Items" fixedHeader 
                fixedHeaderScrollHeight="400px" selectableRowsHighlight 
                highlightOnHover actions={<button className="btn btn-dark" onClick={resetItems}>
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
              <ModalHeader toggle={modalAdd}>Item Details</ModalHeader>
              <ModalBody>
                <form onSubmit={saveItem}>
                <div>
                  <label htmlFor="">Item Code</label>
                  <input type="text" className="form-control" 
                                      value={item_code}
                                      onChange={(e) => setItemCode(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Item Name</label>
                  <input type="text" className="form-control" 
                                      value={item_name}
                                      onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Quantity</label>
                  <input type="number" className="form-control" 
                                      value={item_quantity}
                                      onChange={(e) => setItemQuantity(e.target.value)} />
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
              <form onSubmit={updateItem}>
                  <input type="hidden" className="form-control" 
                                      value={itemUpdateId}
                                      onChange={(e) => setItemId(e.target.value)} />
                <div>
                  <label htmlFor="">Customer Code</label>
                  <input type="text" className="form-control" 
                                      value={item_codeUpdate}
                                      onChange={(e) => setItemCodeUpdate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Customer Name</label>
                  <input type="text" className="form-control" 
                                      value={item_nameUpdate}
                                      onChange={(e) => setItemNameUpdate(e.target.value)} />
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
  
  export default TableItems;
  
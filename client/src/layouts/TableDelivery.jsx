import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import Select from 'react-select'
import {v4 as uuid} from "uuid";
import Swal from "sweetalert2";





import {
    Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, 
    DropdownToggle, Pagination, PaginationItem, PaginationLink, Table, Container, 
    Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, 
    InputGroupText, Input} from "reactstrap";
import DataTable from "react-data-table-component";


  // core components

  
  const TableOrders = () => {

    const item_uuid = uuid();
    const [newId, setNewId] = useState('');


    const [modalCreate, setModalAdd] = useState(false);
    const [modalEdit, setModalUpdate] = useState(false);
  
    const modalAdd = () => setModalAdd(!modalCreate);
    const modalUpdate = () => setModalUpdate(!modalEdit);

    const [itemsList, setItemList] = useState([]);


    const selectedItems = () => {

    }




    useEffect(() => {
      getItemList();
      setNewId(item_uuid)

    }, []);


    const getItemList = async () => {
      const response = await axios.get("http://localhost:8000/items/spGetItemList/value1/value2/value3/value4");
      setItemList(response.data[0])
    };

    const onChangeDelivery = async (e) => {

      const response = await axios.get(`http://localhost:8000/items/spGetItemByOnChange/${e.target.value}/value2/value3/value4`);
      response.data[0].forEach(element => {


      });

    }

    const [data, setData] = useState([]);

    // const addItem = (e) => {
    //   e.preventDefault();

    //  const bodyData = {
    //     item_code: item_code,
    //     item_name: item_name,
    //     quantity: quantity,
    //     item_quantity: item_quantity,
    //     price: price,
    //     item_id: item
    //   } 
      
    //   setData([...data, bodyData]) 
    //   setItem("");
    //   setQuantity("");
    //   setPrice("");
    //   modalAdd();


    // }

    const [customers, setCustomers] = useState([]);

    const options = [];

    customers.forEach(row => {
        const custid = row.customer_id;
        const custName = row.customer_name;      
        options.push({ value: custid, label: custName});
    })

    // const [delivery, setDelivery] = useState([]);

    const deliveryOptions = [];

    // delivery.forEach(row => {
    //     const deliveryID = row.item_uuid;    
    //     deliveryOptions.push({ value: custid, label: custName});
    // })

    
    
    useEffect(() => {
      getCustomers();

        document.getElementById('hide-div').style.display = "none";
        document.getElementById('hide-select').style.display = "none";

    }, [])

    const onChangeBtn = () => {

      document.getElementById('hide-div').style.display = "block";
      document.getElementById('hide-select').style.display = "block";
      
    }


    const getCustomers = async () => {
      const response = await axios.get("http://localhost:8000/customers/spGetAllCustomers/value1/value2/value3/value4");
      setCustomers(response.data[0])
    };


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
        selector: (row) => row.quantity,
        sortable: true
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true
      }
      ]
  
      const onRemoveItem = () => {

      }

      const onAddItem = async () => {
        // console.log(data);
        if(data == ''){
          Swal.fire(
            'Please add an item!',
            '',
            'info'
          )
        }else {

          Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Save',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
              data.forEach(element => {

                const oBody = {
                  item_uuid: item_uuid,
                  item_code: element.item_code,
                  item_name: element.item_name,
                  quantity: element.quantity,
                  price: element.price,
                  item_id: element.item_id
                }
                axios.post("http://localhost:8000/orders", oBody);
                const elemQuantity = element.quantity;
                const item_Sub = element.item_quantity;
                const item_id = element.item_id;

                axios.patch(`http://localhost:8000/item_quantity/${item_id}`, {
                  item_elements: elemQuantity,
                  item_quantity: item_Sub
                });
              })
              setNewId(item_uuid)
              setData([]);
            }
          })



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
                  
                  <div className="col-md-12">
                    <CardHeader className="border-0">
                      <div className="row g-3">
                        <div className="col-md-4 mt-2">
                        <Select options={options} placeholder="Select Customer" 
                        isSearchable noOptionsMessage={() => "No customers found!"} onChange={onChangeBtn}/>
                        </div>
                        <div className="col-md-4 mt-2" id="hide-select">
                          <button className="btn btn-success" onClick={modalAdd}>Select Item</button>
                        </div>
                        <div className="col-md-4 text-center mt-2" id="hide-div">
                        </div>                        
                      </div>
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
                <input type="hidden" value={newId} id="item_uuid" />
                <DataTable columns={columns} data={data} pagination title="Items" fixedHeader 
                fixedHeaderScrollHeight="400px" 
                subHeader subHeaderComponent={<>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    {/* <Button color="primary" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    </Button> */}
                  </InputGroupAddon>
                </InputGroup>
                </>} selectableRows />
              </Card>
            </div>
          </Row>
          {/* Modal Add Start */}
          <Modal isOpen={modalCreate} toggle={modalAdd} className="">
              <ModalHeader toggle={modalAdd}>Item Details</ModalHeader>
              <ModalBody>
                <form >
                <div>
                  <label htmlFor="">Item List</label>
                  <Select options={deliveryOptions} placeholder="Please Select an item here..." onChange={onChangeDelivery}
                        isSearchable noOptionsMessage={() => "Item not found!"}/>
                </div>
                <ModalFooter>
                    <button className="btn btn-primary" type="submit">Add</button>
                </ModalFooter>
                </form>
              </ModalBody>
          </Modal>
          {/* Modal Add End*/}

         
 
        </Container>
      </>
    );
  };
  
  export default TableOrders;
  
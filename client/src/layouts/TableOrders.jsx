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

    const makeid = (length) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }

    const item_uuid = makeid(6);
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

    const [item, setItem] = useState([]);
    const [item_code, setItemCode] = useState([]);
    const [item_name, setItemName] = useState([]);
    const [item_quantity, setItemQuantity] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [price, setPrice] = useState([]);


    const handleOnChange = async (e) => {
      setItem(e.target.value)
      const response = await axios.get(`http://localhost:8000/items/spGetItemByOnChange/${e.target.value}/value2/value3/value4`);
      response.data[0].forEach(element => {
        setItemCode(element.item_code);
        setItemName(element.item_name);
        setItemQuantity(element.item_quantity);
      });

    }

    const [data, setData] = useState([]);

    const addItem = (e) => {
      e.preventDefault();

     const bodyData = {
        item_code: item_code,
        item_name: item_name,
        quantity: quantity,
        item_quantity: item_quantity,
        price: price,
        item_id: item
      } 
      
      setData([...data, bodyData]) 
      setItem("");
      setQuantity("");
      setPrice("");
      modalAdd();


    }

    const [customers, setCustomers] = useState([]);


    const options = [];

    customers.forEach(row => {
        const custid = row.customer_id;
        const custName = row.customer_name;      
        options.push({ value: custid, label: custName});
    })

    
    useEffect(() => {
      getCustomers();

        document.getElementById('hide-div').style.display = "none";

    }, [])

    const [selectedOption, setSelectedOption] = useState("none");

    const handleTypeSelect = e => {
      setSelectedOption(e.value);
      document.getElementById('hide-div').style.display = "block";
      // document.getElementById('disabledSelect').style.display = "none";
    };

    // const onChangeBtn = (e) => {
      // document.getElementById('hide-div').style.display = "block";
      // document.getElementById('disabledSelect').style.display = "none";
    // }

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
                  item_id: element.item_id,
                  customer_id: selectedOption
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
                        <Select
                          options={options}
                          onChange={handleTypeSelect}
                          value={options.filter(function(option) {
                            return option.value === selectedOption;
                          })}
                          label="Single select"
                        />
                        {/* <Select options={options} placeholder="Select Customer" id="disabledSelect"
                        isSearchable noOptionsMessage={() => "No customers found!"} onChange={onChangeBtn} /> */}
                        </div>
                        <div className="col-md-4 text-center mt-2" id="hide-div">
                          <Button color="primary" onClick={modalAdd}>
                        <i className="fa-regular fa-user"></i>{' '}Add Item</Button>
                        <Button color="primary" onClick={onAddItem}>
                        <i className="fa-regular fa-add"></i></Button>
                        <Button color="danger">
                        <i className="fa-regular fa-trash"></i></Button>
                        </div>
                        <div className="col-md-4">
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
                <input type="hidden" value={newId} />
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
                <form onSubmit={addItem}>
                <div>
                  <label htmlFor="">Item List</label>
                  <select className="form-control" value={item} onChange={(e) => handleOnChange(e)} >
                  <option value="" disabled>Select an item</option>
                  {/* {data && data.item_id != null ? (
                    <option>HI</option>
                  ) : (
                    <option>HELLO</option>
                  )} */}
                  {
                    itemsList.map(item => 
                      <option value={item.item_id}>{item.item_name}</option>
                      )
                  }
                </select>
                </div>
                  <input type="hidden" className="form-control" 
                                     value={item_code} onChange={(e) => setItemCode(e.target.value)} />
                  <input type="hidden" className="form-control" 
                                     value={item_name} onChange={(e) => setItemName(e.target.value)} />
                  <input type="hidden" className="form-control"
                                     value={item_quantity} onChange={(e) => setItemQuantity(e.target.value)} />
                <div>
                  <label htmlFor="">Quantity</label>
                  <input type="number" className="form-control" 
                                     value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="">Price</label>
                  <input type="number" className="form-control" 
                                     value={price} onChange={(e) => setPrice(e.target.value)} />
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
  
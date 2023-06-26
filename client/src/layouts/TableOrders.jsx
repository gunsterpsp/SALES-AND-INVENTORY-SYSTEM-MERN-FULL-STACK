import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import Select from 'react-select'




import {
    Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, 
    DropdownToggle, Pagination, PaginationItem, PaginationLink, Table, Container, 
    Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, 
    InputGroupText, Input} from "reactstrap";
import DataTable from "react-data-table-component";


  // core components

  
  const TableOrders = () => {

    const [modalCreate, setModalAdd] = useState(false);
    const [modalEdit, setModalUpdate] = useState(false);
  
    const modalAdd = () => setModalAdd(!modalCreate);
    const modalUpdate = () => setModalUpdate(!modalEdit);

    const [itemsList, setItemList] = useState([]);

    useEffect(() => {
      getItemList();
    }, []);
  
    const getItemList = async () => {
      const response = await axios.get("http://localhost:8000/items/spGetItemList/value1/value2/value3/value4");
      setItemList(response.data[0])
    };

    const [item, setItem] = useState([]);
    const [item_code, setItemCode] = useState([]);
    const [item_name, setItemName] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [price, setPrice] = useState([]);


    const handleOnChange = async (e) => {
      setItem(e.target.value)
      const response = await axios.get(`http://localhost:8000/items/spGetItemByOnChange/${e.target.value}/value2/value3/value4`);
      response.data[0].forEach(element => {
        setItemCode(element.item_code);
        setItemName(element.item_name);
      });

    }

    const [data, setData] = useState([]);

    const addItem = (e) => {
      e.preventDefault();

     const bodyData = {
        item_id: item,
        item_code: item_code,
        item_name: item_name,
        item_quantity: quantity,
        item_price: price
      } 
      


      setData([...data, bodyData]) 
      
      setItem("");
      setQuantity("");
      setPrice("");
      modalAdd();

    }

    const [customers, setCustomers] = useState([]);
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const options = [];

    customers.forEach(row => {
        const custid = row.customer_id;
        const custName = row.customer_name;      
        options.push({ value: custid, label: custName});
    })

    
    useEffect(() => {
      getCustomers();
    }, [])

    // const getCustomers = async () => {
    //   return axios.get("http://localhost:8000/customers/spGetAllCustomers/value1/value2/value3/value4")
    //   .then(result => {
    //     const res = result.data[0];
    //     return res;
    //   })
    // };

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
        selector: (row) => row.item_quantity,
        sortable: true
      },
      {
        name: "Price",
        selector: (row) => row.item_price,
        sortable: true
      }
      ]
  
      const onRemoveItem = () => {

      }

      const onAddItem = () => {
        console.log(data);

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
                      <i className="fa-regular fa-user"></i>{' '}Add Item</Button>
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
                <DataTable columns={columns} data={data} pagination title="Items" fixedHeader 
                fixedHeaderScrollHeight="400px" 
                subHeader subHeaderComponent={<>
                <InputGroup>

                <Select options={options} placeholder="Select Customer" 
                isSearchable noOptionsMessage={() => "No customers found!"}/>

                  {/* <AsyncSelect 
                  cacheOptions 
                  defaultOptions 
                  value={selectedValue} 
                  getOptionLabel={e => e.customer_name} 
                  getOptionValue={e => e.customer_id} 
                  loadOptions={getCustomers} 
                  onInputChange={handleInputChange} 
                  onChange={handleChange} isSearchable /> */}

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
                  {itemsList.map(item => 
                    <option value={item.item_id}>{item.item_name}</option>)
                  }
                </select>
                </div>
                  <input type="hidden" className="form-control" 
                                     value={item_code} onChange={(e) => setItemCode(e.target.value)} />
                  <input type="hidden" className="form-control" 
                                     value={item_name} onChange={(e) => setItemName(e.target.value)} />

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
  
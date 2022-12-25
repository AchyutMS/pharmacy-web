import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import toast from "react-hot-toast";
import Layout from '../components/Layout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Stock() {
  const [ itemMaster, setItemMaster] = useState([]);
  const [ itemBatchQty, setItemBatchQty] = useState([]);
  const [ itemBatchDate, setItemBatchDate] = useState([]);
  const [ requestedItems, setRequestedItems] = useState([]);
  const navigate = useNavigate();


  const token = localStorage.getItem("token")
  var user;
  var operator;

  if(token) {
    user = jwt(token)
    operator = user.operator;
  }

  const getAllItemBatchQty = async () => {
    try {
      const response = await axios.get("/api/store/get-all-items-quantity", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.data.success) {
        setItemBatchQty(response.data.itemBatch);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllItemBatchDate = async () => {
    try {
      const response = await axios.get("/api/store/get-all-items-date", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.data.success) {
        setItemBatchDate(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const getAllItemMaster = async() => {
    try {
      const response = await axios.get("/api/store/get-all-items-master", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.data.success) {
        setItemMaster(response.data.data);
        console.log(response.data.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  
  const getAllRequestedItems = async() => {
    try {
      const response = await axios.get("/api/store/get-all-requested-items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.data.success) {
        setRequestedItems(response.data.data);
        console.log(response.data.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

const MedName = (id) => {
  let name = ""
  itemMaster.map(item => {
    if (item.id == id){
       name = item.name
    }
  })
  return name
}

const RequestItem =async (id) => {
  await axios.post('/api/store/request-item', {id})
  .then((res) => {
    toast.success(res.data.message)
    window.location.reload(true)
  })
  .catch(err => {
    toast.error("Error Requesting")
  })
}
  
  useEffect(() => {
    getAllItemBatchQty();
    getAllItemBatchDate();
    getAllItemMaster();
    getAllRequestedItems();
  },[]);

  const color =
  operator && operator.role === "admin"
    ? "danger"
    : operator && operator.role === "senior"
    ? "secondary"
    : operator && operator.role === "store"
    ? "success"
    : "primary";

console.log(requestedItems)
  return (
    <>
      <Layout />
      <Container>
      <h1 className={`shadow-sm text-${color} mt-5 p-3`}>Stock</h1>

      <Tabs
      defaultActiveKey="quantity"
      id="uncontrolled-tab-example"
      className="mb-3"
    >

      <Tab eventKey="quantity" title="Filter By Quantity">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Batch</th>
                  <th>Expiry Date</th>
                  <th>Qty</th>
                  {/* {
                    user.operator.role == "store" ? <th>Action</th> : null
                  } */}
                </tr>
              </thead>
              <tbody>
                    {itemBatchQty && itemBatchQty.map(item => {
                      return (
                        <tr>
                          <td >{MedName(item.id)}</td>  
                          <td>{item.BatchNo}</td>  
                          <td>{item.ExpiryDate.split(" ")[0].split('-').reverse().join('-')}</td>  
                          <td>{item.Quantity}</td>  
                          {/* {
                            requestedItems.includes(item.id) 
                            ?                       
                            user.operator.role == "store" ? <td><Button variant="success">Requested</Button></td> : null
                            :
                            user.operator.role == "store" ? <td><Button variant="warning" onClick={() => RequestItem(item.id)}>Request</Button></td> : null
                          } */}
                        </tr>  
                      )
                    })}
              </tbody>
            </Table>

      </Tab>

      <Tab eventKey="expiry-date" title="Filter By Expiry Data">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Batch</th>
                  <th>Item Name</th>
                  <th>Expiry Date</th>
                  <th>Qty</th>
                  {/* {
                    user.operator.role == "store" ? <th>Action</th> : null
                  } */}
                </tr>
              </thead>
              <tbody>
                    {itemBatchDate && itemBatchDate.map(item => {
                      return (
                        <tr>
                          <td>{MedName(item.id)}</td>  
                          <td>{item.BatchNo}</td>  
                          <td>{item.ExpiryDate.split(" ")[0].split('-').reverse().join('-')}</td>  
                          <td>{item.Quantity}</td>  
                          {/* {
                            requestedItems.includes(item.id) 
                            ?                       
                            user.operator.role == "store" ? <td><Button variant="success">Requested</Button></td> : null
                            :
                            user.operator.role == "store" ? <td><Button variant="warning" onClick={() => RequestItem(item.id)}>Request</Button></td> : null
                          } */}
                        </tr>  
                      )
                    })}
              </tbody>
            </Table>
      </Tab>
    </Tabs>
    </Container>
    </>
    
  )
}

export default Stock
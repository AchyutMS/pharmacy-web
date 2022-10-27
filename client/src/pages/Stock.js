import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

function Stock() {
  const [ itemMaster, setItemMaster] = useState([]);
  const [ itemBatchQty, setItemBatchQty] = useState([]);
  const [ itemBatchDate, setItemBatchDate] = useState([]);
  const navigate = useNavigate();

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
  
//   const handleCategoryMedicine = (itemId) => {
//     sessionStorage.setItem('category', itemId);
//     // navigate('/category-medicines',{state:{id:itemId}});
//     navigate('/category-medicines');
//   }

const MedName = (id) => {
  console.log(id,'id here')
  let name = ""
  itemMaster.map(item => {
    if (item.id == id){
      console.log(item.name, id)
       name = item.name
    }
  })
  return name
}
  
  useEffect(() => {
    getAllItemBatchQty();
    getAllItemBatchDate();
    getAllItemMaster()
  },[]);


  return (
    <>
      <Layout />
      <h1 className="shadow-sm text-primary mt-5 p-3">Stock</h1>

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
                        </tr>  
                      )
                    })}
              </tbody>
            </Table>
      </Tab>
    </Tabs>

    </>
    
  )
}

export default Stock
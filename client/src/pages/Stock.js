import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

function Stock() {
  const [ itemBatch, setItemBatch] = useState([]);
  const navigate = useNavigate();

  const getAllItemBatch = async () => {
    try {
      const response = await axios.get("/api/store/get-all-item-batch", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.data.success) {
        setItemBatch(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
//   const handleCategoryMedicine = (itemId) => {
//     sessionStorage.setItem('category', itemId);
//     // navigate('/category-medicines',{state:{id:itemId}});
//     navigate('/category-medicines');
//   }

  console.log(itemBatch)
  
  useEffect(() => {
    getAllItemBatch();
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
        Display the batch items that is low in stock
      </Tab>

      <Tab eventKey="expiry-date" title="Filter By Expiry Data">
        Display the batch that are going to expire
      </Tab>
    </Tabs>

    </>
    
  )
}

export default Stock
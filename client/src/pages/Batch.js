import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function Batch() {
    //const location = useLocation();
    //const categoryId = location.state.id;
    const navigate = useNavigate();
    const itemId = sessionStorage.getItem('batch');
    const [ itemName, setItemName ] = useState('');
    const [ batchItems, setBatchItems ] = useState([]); 
    console.log(itemId);

    const getAllMedicines = async () => {
        try {
          const response = await axios.post("/api/store/get-all-batch-from-itemId", {itemId: itemId}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          });
          if (response.data.success) {
            setItemName(response.data.data[0]);
            setBatchItems(response.data.data[1]);
          }
        } catch (error) {
          console.log(error);
        }
      }


    useEffect(() => {
        getAllMedicines();
    },[]);

    console.log(itemName,batchItems)

  return (
    <>
        <Layout />
        <h1 className="shadow-sm text-primary mt-5 p-3">{itemName && itemName}</h1>
        <p><b>(These Columns are temporary, it has to be changed after asking sir)</b></p>

        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Batch No</th>
          <th>Expiry Date</th>
          <th>Quantity</th>
          <th>MRP</th>
        </tr>
      </thead>
      <tbody>

        {
          batchItems && batchItems.map((item) => {
            return (
            <tr key={item._id}>
              <td>{item.BatchNo}</td>
              <td>{item.ExpiryDate}</td>
              <td>{item.Quantity}</td>
              <td>{item.MRP}</td>
            </tr>
            )
          })
        }
      </tbody>
      
    </Table>

    </>
  )
}

export default Batch
import React, { useState, useEffect } from 'react';
import jwt from "jwt-decode";
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Batch() {
  const token = localStorage.getItem("token");
  var operator;

  if (token) {
    operator = jwt(token).operator;
  }
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

    console.log(itemName,batchItems);
    const color =
    operator && operator.role === "admin"
      ? "danger"
      : operator && operator.role === "senior"
      ? "secondary"
      : operator && operator.role === "store"
      ? "success"
      : "primary";

  return (
    <>
        <Layout />
        <Container>
        <h1 className={`shadow-sm text-${color} mt-5 p-3`}>{itemName && itemName}</h1>

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
    </Container>
    </>
  )
}

export default Batch;
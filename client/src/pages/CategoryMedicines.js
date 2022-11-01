import React, { useState, useEffect } from 'react'
import jwt from "jwt-decode";
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

function CategoryMedicines() {
  const token = localStorage.getItem("token");
  var operator;

  if (token) {
    operator = jwt(token).operator;
  }
    const navigate = useNavigate();
    const categoryId = sessionStorage.getItem('category');
    const [ category, setCategory ] = useState(''); 
    const [ items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    
    console.log(categoryId);

    const getAllMedicines = async () => {
        try {
          const response = await axios.post("/api/store/get-all-items-from-category", {categoryId: categoryId}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          });
          if (response.data.success) {
            setItems(response.data.data[1]);
            setCategory(response.data.data[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }

      const handleBatch = (itemId) => {
        sessionStorage.setItem('batch', itemId);
        // navigate('/category-medicines',{state:{id:itemId}});
        navigate('/batch');
      }

    useEffect(() => {
        getAllMedicines();
    },[]);

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
        <h1 className={`shadow-sm text-${color} mt-5 p-3`}>{category && category}</h1>

        <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formPlaintextPhoneNumber"
        >
          <Col sm="3">
            <Form.Control
              name="search"
              type="text"
              placeholder="Search For Item Name"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

          </Col>
        </Form.Group>
      </Form>

        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Id</th>
          <th>Item Name</th>
          {/* <th>MRP</th> */}
          {/* <th>Manufacturer ID</th> */}
        </tr>
      </thead>
      <tbody>

        {
          items && items
          .filter((item) => item.name && item.name.toLowerCase().includes(search))
          .map((item) => {
            return (
            <tr key={item._id} onClick={()=> handleBatch(item.id)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              {/* <td>Rs. {item.sellingprice}</td> */}
              {/* <td>{item.manufacturerid}</td> */}
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

export default CategoryMedicines;
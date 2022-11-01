import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';

import Layout from "../components/Layout";

function Store() {
  const token = localStorage.getItem("token");
  var operator;

  if (token) {
    operator = jwt(token).operator;
  }
  const [itemGroup, setItemGroup] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const getAllMedicineCategories = async () => {
    try {
      const response = await axios.get("/api/store/get-all-item-group", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setItemGroup(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryMedicine = (itemId) => {
    sessionStorage.setItem("category", itemId);
    navigate("/category-medicines");
  };

  console.log(itemGroup);

  useEffect(() => {
    getAllMedicineCategories();
  }, []);

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
      <h1 className={`shadow-sm text-${color} mt-5 p-3`}>Store</h1>

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
              placeholder="Search For Group Name"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Col>
        </Form.Group>
      </Form>

      <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* <th>Parent</th>
            <th>Modified Date</th>
            <th>Blocked</th>
            <th>Pers_catid</th> */}
          </tr>
        </thead>
        <tbody>
          {itemGroup &&
            itemGroup
              .filter(
                (item) => item.name && item.name.toLowerCase().includes(search)
              )
              .map((item) => {
                return (
                  <tr
                    key={item._id}
                    onClick={() => handleCategoryMedicine(item.id)}
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    {/* <td>{item.parent}</td>
                    <td>{item.ModifiedDate}</td>
                    <td>{item.blocked}</td>
                    <td>{item.pers_catid}</td> */}
                  </tr>
                );
              })}
        </tbody>
      </Table>
      </Container>
    </>
  );
}

export default Store;

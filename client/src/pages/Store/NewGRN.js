import React, { useState, useEffect } from "react";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import jwt from 'jwt-decode'
import toast from "react-hot-toast";
import Layout from '../../components/Layout'

function NewGRN() {
    const [poNumber, setpoNumber] = useState();
    const [poDetails, setPoDetails] = useState({});

    const token = localStorage.getItem("token");
    var operator;

    if (token) {
      operator = jwt(token).operator;
    }
  
    const color =
    operator && operator.role === "admin"
      ? "danger"
      : operator && operator.role === "senior"
      ? "secondary"
      : operator && operator.role === "store"
      ? "success"
      : "primary";


      const handleLoad = async (e) => {
        e.preventDefault();
        console.log(poNumber)
        try {
          const response = await axios.post('/api/store/get-purchase-order-details-from-poNumber', {poNumber:poNumber},
                 {
                   headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                   },
                 }
               );
          if(response.data.success){
            toast.success(response.data.message);
            setPoDetails(response.data.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      }

console.log(poDetails)

  return (
    <>
        <Layout />
        <Container>
            <h1 className={`shadow-sm text-{${color}} mt-5 p-3`}>New GRN</h1>

            <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              PO Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="poNumber"
                type="number"
                onChange={(e) => setpoNumber(e.target.value)}
              />
            </Col>

            <Col sm="1">
              <Button
                variant={`${color}`}
                size="md"
                type="submit"
                onClick={(e) => handleLoad(e)}
              >
                Load
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">

          <Form.Label column sm="2">
              Supplier Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="OperName"
                type="text"
                disabled
                value={poDetails?.supplier.Name}
              />
            </Col>

            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="4">
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Control
                  as="textarea"
                  rows={3}
                  disabled
                  value={poDetails?.supplier.oAddress}
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              PurOrder Type
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="OperName"
                type="text"
                value={poDetails?.purDetails?.POType}
              />
            </Col>

            {/* <Form.Label column sm="3">
              Operator Name
            </Form.Label>
            <Col sm="3">
              <Form.Control
                disabled
                name="OperName"
                type="text"
                // value={poDetails?.purDetails.OperName}
              />
            </Col> */}
            
          </Form.Group>
        </Form>

        </Container>
    </>
  )
}

export default NewGRN
import React from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Col, Row, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'

function GRNDetails() {

    var operator;

    const navigate = useNavigate()

    const token = localStorage.getItem("token");
    if (token) {
      operator = jwt(token).operator;
    }

    const params = useParams();
    const [ GRNDetail, setGRNDetail ] = useState([])

    const fetchDetials = async () => {
        try {
          const response = await axios.get(
            `/api/store/get-grn-detial/${params.grnNumber}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.success) {
            toast.success("Records fetched Successfully");
            setGRNDetail(response.data.data);
          } else {
            console.log("No records found");
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      const color =
    operator && operator.role === "admin"
      ? "danger"
      : operator && operator.role === "senior"
      ? "secondary"
      : operator && operator.role === "store"
      ? "success"
      : "primary";

      console.log(GRNDetail)

    useEffect(() => {
        fetchDetials()
    },[])

  return (
    <>
        <Layout />
        <Container>
            <h1 className={`shadow-sm text-{${color}} mt-5 p-3`}>GRN Detail of {params.grnNumber}</h1>

            <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              PO Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
              disabled
                name="poNumber"
                type="number"
                value={GRNDetail.poNumber}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">

          <Form.Label column sm="2">
              Supplier Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="supplierName"
                type="text"
                disabled
                value={GRNDetail && GRNDetail?.supplierName}
              />
            </Col>

            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="4">
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Control
                  name="supplierAddress"
                  as="textarea"
                  rows={3}
                  disabled
                  value={GRNDetail && GRNDetail?.supplierAddress}
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Invoice Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="invoiceNumber"
                type="text"
                disabled
                value={GRNDetail.invoiceNumber}
              />
            </Col>

            <Form.Label column sm="2">
              Invoice Date
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="invoiceDate"
                type="date"
                disabled
                value={GRNDetail.invoiceDate}
              />
            </Col>            
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          
          <Form.Label column sm="2">
              GRN Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
              disabled
                name="GRNNumber"
                type="text"
                value={GRNDetail.GRNNumber}
              />
            </Col>  

            <Form.Label column sm="2">
              Delivery Date
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="deliveryDate"
                type="date"
                disabled
                value={GRNDetail.deliverDate}
              />
            </Col>          
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          
          <Form.Label column sm="2">
              GRN Type
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="deliveryDate"
                type="date"
                disabled
                value={GRNDetail.GRNType}
              />
            </Col>

          </Form.Group>

        </Form>

        <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Name</th>
            <th>Received Quantity</th>
            <th>Free Quantity</th>
            <th>Purchase Rate/Unit</th>
            <th>MRP</th>
            <th>Batch No.</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {GRNDetail?.GRNItem?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.recievedQuantity}</td>
                <td>{item.freeQuantity}</td>
                <td>{item.ratePerUnit}</td>
                <td>{item.MRP}</td>
                <td>{item.batchNo}</td>
                <td>{item.expiryDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

             <Button variant="danger" className="col-12 mb-3" onClick={() => navigate('/grn')  }>Back</Button>
    

        </Container>
    </>
  )
}

export default GRNDetails
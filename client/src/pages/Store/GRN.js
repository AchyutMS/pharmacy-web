import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import Layout from "../../components/Layout";
import Container from "react-bootstrap/Container";
import { Row, Col, Form, Button , Table} from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "react-bootstrap/Card";

function GRN() {
  const navigate = useNavigate();
  const [ allGRN, setAllGRN ] = useState([])

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

  
      const getAllGRNDetails = async () => {
        try {
          const response = await axios.get("/api/store/get-all-grn", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            setAllGRN(response.data.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      };

      console.log(allGRN)


  useEffect(() => {
    getAllGRNDetails()
  }, []);

  return (
    <>
      <Layout />
      <Container>
        <h1 className={`shadow-sm text-${color} mt-5 p-3`}>Goods Received Note</h1>
        <div className="m-3 d-flex justify-content-end">
          <a href="/new-grn">
            <Button variant={`${color}`} size="sm">
              Create New GRN
            </Button>
          </a>
        </div>

        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPhoneNumber"
          >
            <Form.Label column sm="2">
              Purchase Order Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="poNumber"
                type="number"
                autoComplete="off"
                placeholder="Enter PO number"
                // onChange={(e) => setPoNumber(e.target.value)}
              />
            </Col>
            <Form.Label column sm="2">
              GRN Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="poNumber"
                type="number"
                autoComplete="off"
                placeholder="Enter PO number"
                // onChange={(e) => setPoNumber(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Col sm="2">
            <Button
              variant={`${color}`}
              // type="submit"
              // onClick={getPoDetails}
            >
              Apply filter
            </Button>
          </Col>
        </Form>



        <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>PO Number</th>
            <th>GRN Number</th>
            <th>Supplier Name</th>
            <th>View</th>
           
          </tr>
        </thead>
        <tbody>
        {allGRN &&
          allGRN.map((GRN) => {
              return (
                <tr>
                <td>{GRN.poNumber}</td>
                <td>{GRN.GRNNumber}</td>
                <td>{GRN.supplierName}</td>
                <td>
                  <Button
                      variant={`${color}`}
                      size="sm"
                      onClick={() =>
                        navigate(`/GRN/${GRN.GRNNumber}`)
                      }
                    >
                      View
                  </Button>
                </td>
                
                </tr>
              )})}
        </tbody>
      </Table>
      
    </Container>
    </>
  );
}

export default GRN;

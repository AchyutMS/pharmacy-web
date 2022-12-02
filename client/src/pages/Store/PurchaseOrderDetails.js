import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt from "jwt-decode";

import Layout from "../../components/Layout";
import Container from "react-bootstrap/Container";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";

function PurchaseOrderDetails() {
  const [poDetails, setPoDetails] = useState();
  const token = localStorage.getItem("token");
  const params = useParams();
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

  const getPurchaseOrderDetail = async () => {
    try {
      const response = await axios.get(
        `/api/store/get-purchase-order-detail/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Records fetched Successfully");
        console.log(response.data.data)
        setPoDetails(response.data.data);
      } else {
        console.log("No records found");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPurchaseOrderDetail();
  }, []);

  return (
    <>
      <Layout />
      <Container>
        <h1 className={`shadow-sm text-{${color}} mt-5 p-3`}>
          Purchase Order Details
        </h1>

        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="OperName"
                type="text"
                value={poDetails?.supplier.Name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="4">
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Control
                  as="textarea"
                  rows={3}
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

            <Form.Label column sm="3">
              Operator Name
            </Form.Label>
            <Col sm="3">
              <Form.Control
                disabled
                name="OperName"
                type="text"
                value={poDetails?.purDetails.OperName}
              />
            </Col>
          </Form.Group>
        </Form>

        <h2 className={`shadow-sm text-{${color}} mt-5 p-3`}>Items Requested</h2>
      </Container>
      <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Name</th>
            <th>QTY</th>
            <th>Rate/Unit</th>
            <th>Rate</th>
            <th>Discount(%)</th>
            <th>GST(%)</th>
            <th>Discount Amount</th>
            <th>GST Amount</th>
            <th>Total Amount</th>
            <th>Net Amount</th>
            <th>HSN Code</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
            <th>POReqno</th>
          </tr>
        </thead>
        <tbody>
          {poDetails?.item.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.ratePerUnit}</td>
                <td>{item.rate}</td>
                <td>{item.discountPercentage}</td>
                <td>{item.GSTPercentage}</td>
                <td>{item.discountAmount}</td>
                <td>{item.GSTAmount}</td>
                <td>{item.PurchasePrice}</td>
                <td>{item.sellingprice}</td>
                <td>{item.hsncode}</td>
                <td>{item.CGST}</td>
                <td>{item.IGST}</td>
                <td>{item.SGST}</td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <h2 className={`shadow-sm text-{${color}} mt-5 p-3`}>
        Total Amount: Rs. {poDetails?.poTotal}
      </h2>

      <Container className="mt-5">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Mode of Payment
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="MOPay"
                type="text"
                value={poDetails?.purDetails.MOPay}
              />
            </Col>

            <Form.Label column sm="2">
              Mode of Dispatch
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="MODispatch"
                type="text"
                value={poDetails?.purDetails.MODispatch}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Payment Terms and condition
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="PTandC"
                type="text"
                value={poDetails?.purDetails.PTandC}
              />
            </Col>

            <Form.Label column sm="2">
              Delivery To
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="DelTo"
                type="text"
                value={poDetails?.purDetails.DelTo}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Delivery Date From
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="DelDateFrom"
                type="text"
                value={poDetails?.purDetails.DelDateFrom}
              />
            </Col>

            <Form.Label column sm="2">
              Delivery Date To
            </Form.Label>
            <Col sm="4">
              <Form.Control
                disabled
                name="DelDateTo"
                type="text"
                value={poDetails?.purDetails.DelDateTo}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Remark
            </Form.Label>
            <Col sm="4">
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Control
                disabled
                  name="remarks"
                  as="textarea"
                  rows={3}
                  value={poDetails?.purDetails.remarks}
                />
              </Form.Group>
            </Col>

            <Button variant="warning">Print</Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default PurchaseOrderDetails;

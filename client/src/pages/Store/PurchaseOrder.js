import React,{useState} from 'react';
import Layout from '../../components/Layout';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";

function PurchaseOrder() {
    const [poNumber, setPoNumber] = useState();
    const [allPurchaseOrder, setAllPurchaseOrder] = useState([]);
    const getPoDetails = () => {

    }

  return (
    <>
    <Layout />
    <Container>
    <h1 className="shadow-sm text-success mt-5 p-3">Purchase Order</h1>
    <div className="m-3 d-flex justify-content-end">
        <a href="/new-purchase-order">
          <Button variant="success" size="sm">
            New Purchase Order
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
              name="phoneNumber"
              type="number"
              placeholder="Enter PO number"
              onChange={(e) => setPoNumber(e.target.value)}
            />
          </Col>
          <Col sm="2">
            <Button variant="success" type="submit" onClick={getPoDetails}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
    </>
  )
}

export default PurchaseOrder
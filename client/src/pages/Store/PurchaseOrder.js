import React,{useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios'
import toast from "react-hot-toast";

function PurchaseOrder() {
    const [poNumber, setPoNumber] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [allPurchaseOrder, setAllPurchaseOrder] = useState([]);

    const getPoDetails = () => {

    }

    const getAllPODetails = async() => {
      try {
        const response = await axios.get('/api/store/get-all-pur-order',
               {
                 headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                 },
               }
             );
        if(response.data.success){
          toast.success(response.data.message);
          setAllPurchaseOrder(response.data.data)
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }

    console.log(toDate, fromDate)

    useEffect(() => {
      getAllPODetails()
    },[])

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
            From
          </Form.Label>
          <Col sm="4">
            <Form.Control
              name="pur order"
              type="date"
              autoComplete='off'
              placeholder="Enter PO number"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Col>
          <Form.Label column sm="2">
            To
          </Form.Label>
          <Col sm="4">
            <Form.Control
              name="supplier name"
              type="date"
              autoComplete='off'
              placeholder="Enter PO number"
              onChange={(e) => setToDate(e.target.value)}
            />
          </Col>
          
        </Form.Group>
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
              name="pur order"
              type="number"
              autoComplete='off'
              placeholder="Enter PO number"
              onChange={(e) => setPoNumber(e.target.value)}
            />
          </Col>
          <Form.Label column sm="2">
            Supplier Name
          </Form.Label>
          <Col sm="4">
            <Form.Control
              name="supplier name"
              type="text"
              autoComplete='off'
              placeholder="Enter PO number"
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </Col>
          
        </Form.Group>
        <Col sm="2">
            <Button variant="success" type="submit" onClick={getPoDetails}>
              Apply filter
            </Button>
          </Col>
      </Form>


        {
          allPurchaseOrder && allPurchaseOrder.map(purchase => {
            console.log(purchase)
          })
        }

    </Container>
    </>
  )
}

export default PurchaseOrder
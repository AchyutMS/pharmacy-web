import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import Layout from '../../components/Layout';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios'
import toast from "react-hot-toast";
import Card from 'react-bootstrap/Card';

function PurchaseOrder() {
    const [suppliers, setSuppliers] = useState([]);
    const [poNumber, setPoNumber] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [allPurchaseOrder, setAllPurchaseOrder] = useState([]);
    const navigate = useNavigate();

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

    // const getPoDetails = async (e) => {
    //   e.preventDefault();
    //   console.log('calling allPODetails')
    //   await getAllPODetails();
    //   console.log('getPoDetails',poNumber,supplierName,fromDate,toDate);
    //   var filterPurchaseOrder = [];
    //   allPurchaseOrder.map(purchase => {
    //     if(purchase.poNumber == poNumber || purchase.supplier._id == supplierName) {
    //       console.log('inside if')
    //       filterPurchaseOrder.push(purchase);
    //     }
    //   })
    //   setAllPurchaseOrder(filterPurchaseOrder)
    // }



    const getAllSuppliers = async () => {
      try {
        const response = await axios.get("/api/senior/get-all-suppliers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setSuppliers(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleApproval = async (id,approval) => {
      console.log('handleApproval')
      try {
        const response = await axios.post("/api/senior/purchase-order-approval", {id,approval},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          toast.success(response.data.message);
          window.location.reload();
        } else {
          toast.success(response.data.message);
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log(toDate, fromDate)

    useEffect(() => {
      getAllPODetails();
      getAllSuppliers();
    },[])

console.log("all po",allPurchaseOrder)
console.log('operator',operator)
  return (
    <>
    <Layout />
    <Container>
    <h1 className={`shadow-sm text-${color} mt-5 p-3`}>Purchase Order</h1>
    <div className="m-3 d-flex justify-content-end">
        <a href="/new-purchase-order">
          <Button variant={`${color}`} size="sm">
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
              name="fromDate"
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
              name="toDate"
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
              name="poNumber"
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
            {/* <Form.Control
              name="supplierName"
              type="text"
              autoComplete='off'
              placeholder="Enter Supplier Name"
              onChange={(e) => setSupplierName(e.target.value)}
            /> */}
            <Form.Select aria-label="Default select example" onChange={(e) => setSupplierName(e.target.value)}>
                <option>Select Supplier</option>
                {
                    suppliers && suppliers.map(item => (
                        <option value={item._id}>{item.name}</option>
                    ))
                }
            </Form.Select>
          </Col>
          
        </Form.Group>
        <Col sm="2">
            <Button variant={`${color}`} type="submit" 
            // onClick={getPoDetails}
            >
              Apply filter
            </Button>
          </Col>
      </Form>

        {
          allPurchaseOrder && allPurchaseOrder.map(purchase => (
            <div key={purchase.poNumber}>
              <Card  body className="mb-2">

                <div className="d-flex justify-content-between">
                  <div className="p-2">
                    <b>{purchase.supplier.name}</b>
                    <div>{purchase.poNumber}</div>
                    <Button variant={`${color}`} size="sm" onClick={()=> navigate(`/purchase-order/${purchase.poNumber}`)}>View</Button>
                  </div>
                  
                  <div className="p-2">
                    <div className="d-flex" >
                    
                    {/* <Print ref={componentRef} detials={prescription}/> */}

                    {
                      operator?.role == "store" 
                      ?
                      purchase.isApproved 
                      ?<Button variant="success" size="sm">Appoved</Button>
                      :<Button variant="warning" size="sm">Yet To be Approved</Button>
                      :
                      purchase.isApproved 
                      ?<Button variant="success" size="sm">Appoved</Button>
                      :<>
                      <Button variant="success" size="sm" onClick={()=>handleApproval(purchase._id,true)}>Approve</Button>
                      <Button variant="danger" size="sm" onClick={()=>handleApproval(purchase._id,false)}>Reject</Button>
                      </>
                    }
                                     
                    </div>
                  </div>
                </div>

              </Card>
              
            </div>
          ))
        }


    </Container>
    </>
  )
}

export default PurchaseOrder
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useParams} from 'react-router-dom';
import toast from "react-hot-toast";
import ReactToPrint from "react-to-print";
import { Row, Col, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import Layout from "../../components/Layout";
import {PrintPrescription} from '../../components/PrintPrescription';

function PatientRecord() {
    const patient = JSON.parse(sessionStorage.getItem("patient"));
    const params = useParams();

    // const componentRef = useRef();

    const [ currPatient, setCurrPatient ] = useState([])
    const [prescription, setPrescription] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    const getPrescriptionDetail = async () => {
          try {
            const response = await axios.get(`/api/salesman/get-prescription-detail/${patient._id}/${params.id}`, 
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            if(response.data.success) {
              // toast.success("Records fetched Successfully");
               setPrescription(response.data.data.prescription);
               setCurrPatient(response.data.data.patient);
            } else {
              console.log("No records found")
              toast.error(response.data.message);
            }
    
          } catch (error) {
              console.log(error);
          }
          
      }


  useEffect(() => {
    if(prescription.length == 0){
      getPrescriptionDetail();
    }
    calculateTotalAmount();
  },[prescription]);


  const calculateTotalAmount = () => {
    let total = 0;
    prescription.map(item => {
      if(item.required_quantity){
        total += Math.round(((item.MRP * item.returnQty)-(item.returnAmount))*100)/100
        console.log(typeof(total),"printing type")
      } else {
        total += 0
      }
    })
    setTotalAmount(total);
  }

  const UpdateBill = async() => {
    console.log('inside', prescription)
    try {
      const response = await axios.post(
        "/api/salesman/update-bill",
        {
          prescription: prescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log("response", response.data.data);
      }
      window.location.reload(true)
    }
    catch(err) {
      console.log(err.message)
    }
  }

  const handleQuantity = async(id,quantity) => {
    console.log('handlequantity',quantity)
    const newState = prescription.map(obj => {
      if (obj._id === id) {
        if(parseInt(quantity) < 0 || parseInt(quantity) > parseInt(obj.required_quantity)){
          quantity = 0
        }
        calculateTotalAmount();
        return {...obj, returnQty: parseInt(quantity)};
      }
      return obj;
    });

    setPrescription(newState);
  };

  console.log('prescription',prescription)
  return (
      <div>
        <Layout />
        <h1 className="shadow-sm text-primary mt-5 p-3">Bill Details: {}</h1>

        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Col sm="2">
              <Form.Control
                disabled
                value={currPatient.name}
              />
            </Col>
  
            <Col sm="2">
              <Form.Control
                disabled
                value={currPatient.age}
              />
            </Col>
  
            <Col sm="2">
              <Form.Control
                disabled
                value={currPatient.sex}
              />
            </Col>
  
            <Col sm="2">
              <Form.Control
                disabled
                value={currPatient.service}
              />
            </Col>
  
            <Col sm="2">
              <Form.Control
                disabled
                value={"Dr. "+ currPatient.doctorReffered}
              />
            </Col>
          </Form.Group>
        </Form>
  
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPhoneNumber"
          >
           
            <Col sm="10">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Batch</th>
                    <th>Qty</th>
                    <th>Price</th>
                    {/* <th>Basic Amount</th> */}
                    <th>D[%]</th>
                    <th>Dis. Amt</th>
                    <th>Tax %</th>
                    <th>Tax</th>
                    <th>Return</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription &&
                    prescription.map((item) => {

                      // console.log(typeof(item.returnQty), typeof(item.required_quantity))


                      var cost = (parseFloat(item.MRP) * parseFloat(item.required_quantity))
                      var returnCost = (parseFloat(item.MRP) * parseFloat(item.hasOwnProperty("returnQty") ? item.returnQty : 0))
                      item.returnAmount = returnCost * item.discountPer/100
                      
                      item.discountPer = currPatient.service !== "none" ? cost > 100 ? cost > 1000 ? 20 : 10 : 0 : 0
                      item.discountAmount = cost * item.discountPer/100
                      return (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>{item.BatchNo}</td>
                          <td>{item.required_quantity}</td>
                          <td>{parseFloat(item.MRP).toFixed(2)}</td>
                          <td>{item.discountPer}</td>
                          <td>{item.discountAmount / item.required_quantity}</td>
                         <td>-</td>
                          <td>-</td>
                          
                          <td>
                            <input
                              type="number"
                              required
                              onChange={(e)=> handleQuantity(item._id, e.target.value)}
                              value = {!item.hasOwnProperty("returnQty") ? handleQuantity(item._id, 0) : item.returnQty <= parseInt(item.required_quantity) && item.returnQty>0 ? item.returnQty : 0}
                            />
                          </td>

                          <td>{parseFloat((parseFloat(item.MRP) * parseInt(item.returnQty))-(item.returnAmount)).toFixed(2)}</td>
                          {/* <td>{item.MRP}</td> */}
                          
                          
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <div className="m-3 d-flex justify-content-end " >
                
                {/* <ReactToPrint 
                  trigger = {() => <Button variant='warning' size='sm'>Print</Button>}
                  content = {() => componentRef.current}
                /> */}

                <Button variant="primary" size="sm" onClick={() => UpdateBill()}>
                  Generate Bill
                </Button>

              </div>
            </Col>
          </Form.Group>
        </Form>
                    
        <h2 className="shadow-sm text-primary mt-5 p-3">Total Amount: Rs. {totalAmount}
        </h2>
        

      </div>
  )
}

export default PatientRecord;
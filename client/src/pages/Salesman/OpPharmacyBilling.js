import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import ReactToPrint from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate,Navigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';

import Layout from "../../components/Layout";
import toast from "react-hot-toast";

import { setPatient } from '../../redux/patientSlice';
import PrintPrescription from '../../components/PrintPrescription';

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className='print-source'>
        <PrintPrescription detail={this.props.detail}/>
      </div>
    );
  }
}


class Print extends React.Component {
  render() {
    return (
        <div>
          <ReactToPrint
            trigger={() => <a href="#">Print</a>}
            content={() => this.componentRef}
          />
          <ComponentToPrint ref={el => (this.componentRef = el)} detail={this.props.detail}/>
        </div>
    );
  }
}

function OpPharmacyBilling() {
    //const {patient} = useSelector((state) => state.patient);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [patientPhone, setPatientPhone] = useState('')
    
    const [patient,setPatient] = useState(null) 
  
    const componentRef = useRef();
  

    const getPatientDetails = async (e) => {
      e.preventDefault();
        try {
          const response = await axios.post('/api/salesman/get-patient-info-by-phone-number', {phoneNumber: patientPhone}, 
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          if(response.data.success) {
            toast.success("Records fetched Successfully");
            //dispatch(setPatient(response.data.data))
             setPatient(response.data.data);
            // console.log("*******************",patient);
            // navigate('/patient-records',{state:{patient: patient}})
          } else {
            console.log("No records found")
            toast.error(response.data.message);
          }

        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        sessionStorage.setItem('patient', JSON.stringify(patient));
    }, [patient]);


    // console.log(patient)
    // console.log(patient && patient.records.prescriptions)
  return (
    <>
      <Layout />

      <h1 className="shadow-sm text-primary mt-5 p-3">OP Pharmacy Billing</h1>

      <div className="m-3 d-flex justify-content-end">
        <a href="/register-patient">
          <Button variant="primary" size="sm">
            New Patient Data
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
            Phone Number
          </Form.Label>
          <Col sm="4">
            <Form.Control
              name="phoneNumber"
              type="number"
              placeholder="Enter phone number"
              onChange={(e) => setPatientPhone(e.target.value)}
            />
          </Col>
          <Col sm="2">
            <Button variant="primary" type="submit" onClick={getPatientDetails}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>

      {
        patient && 
        <>
          <h1 className="shadow-sm text-primary mt-5 p-3">Patient Records</h1>

          <div className="m-3 d-flex justify-content-end">
        {/* <a href="/new-bill"> */}
          <Button variant="primary" size="sm" onClick={()=> navigate('/new-bill', patient)}>
            Generate New Bill
          </Button>
        {/* </a> */}
      </div>

          {patient.records.prescriptions && patient.records.prescriptions.map((prescription,prescriptionId) => (
            <div >
              <Card body className="mb-2">

                <div className="d-flex justify-content-between">
                  <div className="p-2">{prescription.patient.name}</div>
                  <div className="p-2">
                    <div className="d-flex">
                      <Print detail={prescription}/>
                      <Button variant="primary" size="sm" onClick={()=> navigate(`/patient-record/${prescriptionId}`)}>Edit</Button>

                    </div>
                  </div>
                </div>

              </Card>
              
            </div>
          ))}

        {/* <div className='d-none'>
          <PrintPrescription ref={componentRef} />
        </div> */}
        </>
      }
      

    </>
  );
}

export default OpPharmacyBilling;

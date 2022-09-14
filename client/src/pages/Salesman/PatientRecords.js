import React, { useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

import { useNavigate,useLocation } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";

function PatientRecords() {
    //const {patient} = useSelector((state) => state.patient)
    const location = useLocation();
    console.log('patient in PatientRecrd',location.state.patient)
  return (
    <>
        <Layout />
        <h1 className="shadow-sm text-primary mt-5 p-3">Patient Records</h1>
        <div className="m-3 d-flex justify-content-end">
        <a href="/new-bill">
          <Button variant="primary" size="sm">
            Generate New Bill
          </Button>
        </a>
      </div>
        todo
        Fetch prescriptions from patient that is present in redux and print it as cards
    </>
    
  )
}

export default PatientRecords
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


  useEffect(() => {

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

    </Container>
    </>
  );
}

export default GRN;

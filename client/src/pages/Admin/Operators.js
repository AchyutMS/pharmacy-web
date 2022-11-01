import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Layout from "../../components/Layout";

function Operators() {
  const [operators, setOperators] = useState([]);

  const getAllOperators = async () => {
    try {
      const response = await axios.get("/api/admin/get-all-operators", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setOperators(response.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllOperators();
  }, []);
  return (
    <>
      <Layout />

      <h1 className="shadow-sm text-danger mt-5 p-3">Operators</h1>

      <div className="m-3 d-flex justify-content-end">
        <a href="/register-operator">
          <Button variant="danger" size="sm">
            Create New Operator
          </Button>
        </a>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Operator ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {operators &&
            operators.map((operator) => {
              return (
                <tr key={operator._id}>
                  <td>{operator.OID}</td>
                  <td>{operator.name}</td>
                  <td>{operator.email}</td>
                  <td>{operator.role}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default Operators;

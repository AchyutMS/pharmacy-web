import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import Layout from "../../components/Layout";
import Table from "react-bootstrap/Table";

function NewBill() {
  //const { patient } = useSelector((state) => state.patient);
  const patient = JSON.parse(sessionStorage.getItem("patient"));

  const { operator } = useSelector((state) => state.operator);
  const [itemMaster, setItemMaster] = useState();
  const [search, setSearch] = useState("");

  const [prescription, setPrescription] = useState([]);

  let [state, setState] = useState({
    user: {
      name: "",
      age: "",
      sex: "",
      doctorReffered: '',
    },
  });

  const getAllItemMaster = async () => {
    try {
      const response = await axios.get("/api/store/get-all-item-master", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setItemMaster(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateBill = async () => {
    console.log(patient,state.user,prescription)
    try {
      const response = await axios.post("/api/salesman/generate-bill",
      {patient: patient, sub_patient: state.user, prescription: prescription},
       {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        console.log("response",response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllItemMaster();
  }, []);

  let updateInput = (e) => {
    setState({
      ...state,
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <Layout />
      <h1 className="shadow-sm text-primary mt-5 p-3">New Bill</h1>

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Col sm="2">
            <Form.Control
              onChange={updateInput}
              name="name"
              type="text"
              placeholder="Enter name"
            />
          </Col>

          <Col sm="2">
            <Form.Control
              onChange={updateInput}
              name="age"
              type="number"
              placeholder="Enter age"
            />
          </Col>

          <Col sm="2">
            <Form.Select
              aria-label="Default select example"
              name="sex"
              onChange={updateInput}
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </Form.Select>
          </Col>

          <Col sm="4">
            <Form.Control
              onChange={updateInput}
              name="doctorReffered"
              type="text"
              placeholder="Doctor Reffered"
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
          <Col sm="3">
            <Form.Control
              name="search"
              type="text"
              placeholder="Medicine Name"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            <Card>
              {itemMaster &&
                itemMaster
                  .filter((item) => item.name.toLowerCase().includes(search))
                  .slice(0, 5)
                  .map((item) => (
                    <Card.Body
                      key={item._id}
                      onClick={() => {
                        if (prescription.includes(item) === false) {
                          setPrescription([...prescription, item]);
                        }
                      }}
                    >
                      {item.name}
                    </Card.Body>
                  ))}
            </Card>
          </Col>
          <Col sm="8">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescription &&
                  prescription.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              setPrescription((prev) =>
                                prev.filter(
                                  (cart_item) => cart_item._id !== item._id
                                )
                              )
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <div className="m-3 d-flex justify-content-end" onClick={generateBill}>
              <Button variant="primary" size="sm">
                Generate Bill
              </Button>
            </div>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default NewBill;

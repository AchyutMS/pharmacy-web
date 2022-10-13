import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import Layout from "../../components/Layout";
import BatchModal from "./BatchModal";



function NewBill() {
  //const { patient } = useSelector((state) => state.patient);
  const patient = JSON.parse(sessionStorage.getItem("patient"));

  const { operator } = useSelector((state) => state.operator);
  const [itemMaster, setItemMaster] = useState([]);
  const [itemBatch, setItemBatch] = useState([]);
  const [search, setSearch] = useState("");

  const [prescription, setPrescription] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [idArray, setIdArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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
      const response = await axios.get("/api/store/get-all-item-details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        console.log(response)
        setItemMaster(response.data.data[0]);
        setItemBatch(response.data.data[1]);
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

  function handleRemove(id,item) {
    let newList = prescription.filter((item) => item._id !== id);
    setPrescription(newList);

    newList = idArray.filter((item) => item !== id);
    setIdArray(newList);

    setTotalAmount(totalAmount-parseFloat(item.MRP));
  }

  function selectBatch(item) {
    setSelectedItem(item);
    setModalShow(true);
  }

  function addPrescription(selectedItem) {
    if (prescription && idArray.includes(selectedItem._id) === false) {
      setPrescription([...prescription, selectedItem]);
      setIdArray([...idArray, selectedItem._id]);
      setTotalAmount(totalAmount + parseFloat(selectedItem.MRP));
    }
    setModalShow(false);
  }

// console.log(itemMaster && itemMaster)
// console.log(itemBatch && itemBatch)
console.log("prescription",prescription && prescription)
console.log("idArray",idArray && idArray)
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
                      // onClick={() => {
                      //   if (prescription && prescription.includes(item) === false) {
                      //     setPrescription([...prescription, item]);
                      //   }
                      // }}
                      onClick={() => selectBatch(item)}
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
                  <th>Item Name</th>
                  <th>Batch</th>
                  <th>Qty</th>
                  <th>Price</th>
                  {/* <th>Basic Amount</th> */}
                  <th>D[%]</th>
                  <th>Dis. Amt</th>
                  <th>Tax %</th>
                  <th>Tax</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescription &&
                  prescription.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.BatchNo}</td>
                        <td>-</td>
                        <td>{item.MRP}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{item.MRP + item.Tax}</td>
                        {/* <td>-</td> */}
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRemove(item._id,item)}
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

      <h2 className="shadow-sm text-primary mt-5 p-3">Total Amount: Rs. {Math.round(totalAmount)}
      </h2>

      <BatchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item = {selectedItem}
        addPrescription = {addPrescription}
      />
    </>
  );
}

export default NewBill;

import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import jwt from "jwt-decode";
import toast from "react-hot-toast";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

function NewGRN() {
  const [poNumber, setpoNumber] = useState();
  const [poDetails, setPoDetails] = useState();
  const [index, setIndex] = useState(0);

  const [search, setSearch] = useState('');

  const token = localStorage.getItem("token");
  var operator;

  const navigate = useNavigate();

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

  const [GRN, setGRN] = useState({
    poNumber: "",
    supplierName: "",
    supplierAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
    deliveryDate: "",
    GRNNumber: "",
    GRNType: "Partial GRN",
    operator: operator,
  });

  const [poItems, setPoItems] = useState([]); 
  const [GRNItem, setGRNItem] = useState([]);

  let updateInput = (e) => {
    setGRN({
      ...GRN,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoad = async (e) => {
    e.preventDefault();
    // console.log(poNumber)
    try {
      const response = await axios.post(
        "/api/store/get-purchase-order-details-from-poNumber",
        { poNumber: poNumber },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setPoDetails(response.data.data);
        setGRN({
          ...GRN,
          poNumber: response.data.data.poNumber,
          supplierName: response.data.data.supplier.Name,
          supplierAddress: response.data.data.supplier.oAddress,
        });
        // setGRNItem(response.data.data.item);
        setPoItems(response.data.data.item);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const calculateProdCount = (i, e) => {
    var sum=i.item.qty
    GRNItem.map(item => {
      if(item.item.id==i.item.id){
        sum = sum-item.recievedQuantity
        if(sum<0){
          item.recievedQuantity = item.recievedQuantity + sum
        }
      }
    })
    
    console.log(sum)
  }

  const handleChange = (e, index) => {
    var newGRNItem = [];

    GRNItem.map((item) => {
      if (item.index == index) {
        console.log(index, item.index)
        if (e.target.name == "batchNo") {
          item[e.target.name] = e.target.value;
        } else if (e.target.name=="expiryDate" ) {
            if(new Date(e.target.value) < new Date() ) {
              toast.error('Medicine has expired')
              console.log(new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate());
              item[e.target.name] = "";
            } else {
              item[e.target.name] = e.target.value;
            }

            
        } else {
          item[e.target.name] = parseInt(e.target.value);
        }
        newGRNItem.push(item)
      } else {
        newGRNItem.push(item);
      }
      // newGRNItem = [...newGRNItem, item];
      calculateProdCount(item, e)
    });

    setGRNItem(newGRNItem);
  };

  // item[e.target.name] = parseInt(e.target.value);
  // const handleReceivedQuantity = (e,id) => {
  //   var newGRNItem = [];
  //   console.log(poDetails)

  //   GRNItem.map(item => {
  //     if(item.id == id){
  //       poDetails.item.map(i => {
  //         if(i.id == item.id){
  //           if(parseInt(e.target.value)>i.qty)
  //             item[e.target.name] = i.qty;
  //         }
  //       })
  //     }
  //     newGRNItem = [...newGRNItem, item];
  //   })

  //   setGRNItem(newGRNItem);
  //   console.log("newGRN",newGRNItem);

  // }

  const handleClick = async () => {
    try {
      if (GRN.GRNNumber != "") {
        const response = await axios.post(
          "/api/store/save-grn",
          { GRN, GRNItem },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/grn");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Enter GRN Number");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleItemAdd = (item) => {
    var obj = {item}
    obj.index = index
    setIndex(index+1)
    setGRNItem([...GRNItem,obj])
  }

  const handleDelete = (index,e) => {
    setGRNItem(GRNItem.filter((item, i) => item.index !== index));
}

  // console.log(poDetails && poDetails);
  // console.log(GRN && GRN);
  console.log("GRN ITEMS",GRNItem && GRNItem);
  console.log("PO ITEMS",poItems && poItems);

  return (
    <>
      <Layout />
      313017	
      <Container>
        <h1 className={`shadow-sm text-{${color}} mt-5 p-3`}>New GRN</h1>

        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              PO Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="poNumber"
                type="number"
                onChange={(e) => setpoNumber(e.target.value)}
              />
            </Col>

            <Col sm="1">
              <Button
                variant={`${color}`}
                size="md"
                type="submit"
                onClick={(e) => handleLoad(e)}
              >
                Load
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="supplierName"
                type="text"
                disabled
                value={poDetails && poDetails?.supplier?.Name}
              />
            </Col>

            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="4">
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Control
                  name="supplierAddress"
                  as="textarea"
                  rows={3}
                  disabled
                  value={poDetails && poDetails?.supplier?.oAddress}
                />
              </Form.Group>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Invoice Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="invoiceNumber"
                type="text"
                onChange={updateInput}
              />
            </Col>

            <Form.Label column sm="2">
              Invoice Date
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="invoiceDate"
                type="date"
                onChange={updateInput}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              GRN Number
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="GRNNumber"
                type="text"
                onChange={updateInput}
              />
            </Col>

            <Form.Label column sm="2">
              Delivery Date
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="deliveryDate"
                type="date"
                onChange={updateInput}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              GRN Type
            </Form.Label>
            <Col sm="4">
              <Form.Select
                aria-label="Default select example"
                name="GRNType"
                onChange={updateInput}
              >
                <option value="Partial GRN">Partial GRN</option>
                <option value="Complete GRN">Complete GRN</option>
              </Form.Select>
            </Col>
          </Form.Group>



          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Item Name
            </Form.Label>
            <Col sm="4">
            <Form.Control
                name="search"
                type="text"
                autocomplete='off'
                placeholder="Search Item Name"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />

            <Card className="border-secondary mb-3 mt-3">
                {poDetails &&
                  poDetails?.item
                    .filter((item) => item.name.toLowerCase().includes(search))
                    .slice(0, 10)
                    .map((item) => (
                      <Card.Body
                        className="shadow"
                        key={item._id}
                        // onClick={() => {
                        //     if(addMapItem(item)===false){
                        //         setPOItem([...POItem,item])
                        //     }
                        // }
                        // }
                        onClick = {() => handleItemAdd(item)}
                      >
                        {item.name}
                      </Card.Body>
                    ))}
              </Card>
            </Col>
        </Form.Group>





        </Form>

        <Table striped bordered hover responsive="sm" center>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Received Quantity</th>
              <th>Free Quantity</th>
              <th>Purchase Rate/Unit</th>
              <th>MRP</th>
              <th>Batch No.</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {GRNItem &&
              GRNItem.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.item.name}</td>
                    <td>
                      <input
                        type="number"
                        name="recievedQuantity"
                        min={0}
                        max={100}
                        value={item.recievedQuantity}
                        onChange={(e) => handleChange(e, item.index)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="freeQuantity"
                        min="0"
                        value={item.freeQuantity}
                        onChange={(e) => handleChange(e, item.index)}
                        required
                      />
                    </td>
                    <td>{item.item.ratePerUnit}</td>
                    <td>
                      <input
                        type="number"
                        name="MRP"
                        min="0"
                        value={item.MRP}
                        onChange={(e) => handleChange(e, item.index)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="batchNo"
                        value={item.batchNo}
                        onChange={(e) => handleChange(e, item.index)}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="expiryDate"
                        value={item.expiryDate}
                        onChange={(e) => handleChange(e, item.index)}
                        required
                      />
                    </td>
                    <td>
                      <Button 
                      variant="danger" 
                      onClick={e => handleDelete(item.index,e)}
                      >Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Button
          variant="success"
          className="col-12 mb-3"
          onClick={(e) => handleClick(e)}
        >
          Save
        </Button>
        <Button
          variant="danger"
          className="col-12 mb-3"
          onClick={() => navigate("/grn")}
        >
          Back
        </Button>
      </Container>
    </>
  );
}

export default NewGRN;

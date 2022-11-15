import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../../components/Layout';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import jwt from 'jwt-decode'

function NewPurchaseOrder() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState();
    const [POItem, setPOItem] = useState([]);
    const token = localStorage.getItem("token");
  var operator;

  if (token) {
    operator = jwt(token).operator;
  }
    
    let [state, setState] = useState({
      PurOrderno : "",
      OperName: operator.name,
      POType: "",
      MOPay: "",
      MODispatch: "",
      PTandC: "",
      remarks: "",
      DelDateFrom : "",
      DelDateTo : "" ,
      DelTo : "" ,
    });

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

      const addMapItem = (item) => {
        var i;
        for (i = 0; i < POItem.length; i++) {
          // console.log(MapItem[i], 'ok', item, 'inside for loop')
            if (POItem[i].name === item.name && POItem[i].id === item.id) {
                return true;
            }
        }
    
        return false;
      }

    const handleSupplierSelect = async(event) => {
        try {
            const response = await axios.post("/api/store/get-supplier-details-from-id", {supplierId: event.target.value}, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            });
            if (response.data.success) {
              setSelectedSupplier(response.data.data);
            }
          } catch (error) {
            console.log(error);
          }
      };

      const removeMapItem = (item) => {
        setPOItem(arr => (
          arr.filter((value, i) => value !== item)
        ));
      }

      let updateInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
      };

      const handleClick = async(e) => {
        e.preventDefault()
        console.log('button clicked')
        try {
          const response = await axios.post("/api/store/new-pur-order", {state, POItem, selectedSupplier}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.data.success) {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    
    useEffect(() => {
        getAllSuppliers();
      }, []);

    // console.log(suppliers)
    // console.log(POItem)
    // console.log(selectedSupplier)
  return (
    <>
    <Layout />
    <Container>
        <h1 className="shadow-sm text-success mt-5 p-3">New Purchase Order</h1>
        
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Name
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" onChange={handleSupplierSelect}>
                <option>Select Supplier</option>
                {
                    suppliers && suppliers.map(item => (
                        <option value={item._id}>{item.name}</option>
                    ))
                }
            </Form.Select>
            </Col>

            <Form.Label column sm="2">
              Purchase Order No 
            </Form.Label>
            <Col sm="4">
            <Form.Control
                name="PurOrderno"
                type="text"
                autocomplete='off'
                placeholder="Purchase Order No"
                onChange={updateInput}
              />
            </Col>

            
          </Form.Group>

          

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="4">
            <Form.Group className="mb-3" controlId="formGridAddress">   
                <Form.Control as="textarea" rows={3} value={selectedSupplier?.address}/>
            </Form.Group>
            </Col>

            <Form.Label column sm="2">
              Operator Name
            </Form.Label>
            <Col sm="4">
            <Form.Control
            disabled
                name="OperName"
                type="text"
                value={state.OperName}
              />
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
                placeholder="Search Item Name"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            <Card className="border-secondary mb-3 mt-3">
                {selectedSupplier &&
                  selectedSupplier.items
                    .filter((item) => item.name.toLowerCase().includes(search))
                    .slice(0, 10)
                    .map((item) => (
                      <Card.Body
                        className="shadow"
                        key={item._id}
                        onClick={() => {
                            if(addMapItem(item)===false){
                                setPOItem([...POItem,item])
                            }
                        }
                        }
                      >
                        {item.name}
                      </Card.Body>
                    ))}
              </Card>
            </Col>

            <Form.Label column sm="2">
              PurOrder Type
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="POType" onChange={updateInput}>
                <option value=""></option>
                <option value="Normal Purchase (NP)">Normal Purchase (NP)</option>
                <option value="Other Purchase (OP)">Other Purchase (OP)</option>
            </Form.Select>
            </Col>
        </Form.Group>
        
        </Form>


        <h2 className="shadow-sm text-success mt-5 p-3">Items To Be Requested(**Only Take the important fields**)</h2>
    </Container>
        <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Name</th>
            <th>Units</th>
            <th>Contains</th>
            <th>QTY</th>
            <th>Rate</th>
            <th>Rate/Unit</th>
            <th>Discount(%)</th>
            <th>GST(%)</th>
            <th>Discount Amount</th>
            <th>GST Amount</th>
            <th>Total Amount</th>
            <th>Net Amount</th>
            <th>HSN Code</th>
            <th>SGST</th>
            <th>CGST</th>
            <th>IGST</th>
            <th>POReqno</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
              {POItem && POItem.map((item, index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.PurchasePrice}</td>
                  <td>{item.sellingprice}</td>
                  <td>{item.hsncode}</td>
                  <td>{item.CGST}</td>
                  <td>{item.IGST}</td>
                  <td>{item.SGST}</td>
                  <td>{item.name}</td>
                  <td><Button variant="danger" onClick={() => removeMapItem(item)}>Remove</Button></td>
                </tr>
              )})}
        </tbody>
      </Table>
          
                <Container className="mt-5">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Mode of Payment
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="MOPay" onChange={updateInput}>
                <option value=""></option>
                <option value="NEFT">NEFT</option>
                <option value="Other">Other</option>
            </Form.Select>
            </Col>

            <Form.Label column sm="2">
              Mode of Dispatch
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="MODispatch" onChange={updateInput}>
            <option value=""></option>
                <option value="Direct dispatch by vendor">Direct dispatch by vendor</option>
                <option value="Other">Other</option>
            </Form.Select>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Payment Terms and condition
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="PTandC" onChange={updateInput}>
            <option value=""></option>
                <option value="10 days payment">10 days payment</option>
                <option value="30 days payment">30 days payment</option>
                <option value="45 days payment">45 days payment</option>
            </Form.Select>
            </Col>

            <Form.Label column sm="2">
              Delivery To
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="DelTo" onChange={updateInput}>
            <option value=""></option>
                <option value="SIMS vadapalani">SIMS vadapalani</option>
                <option value="Other">Other</option>
            </Form.Select>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Delivery Date From
            </Form.Label>
            <Col sm="4">
            <Form.Control
                name="DelDateFrom"
                type="date"
                autocomplete='off'
                onChange={updateInput}
              />
            </Col>

            <Form.Label column sm="2">
              Delivery Date To
            </Form.Label>
            <Col sm="4">
            <Form.Control
                name="DelDateTo"
                type="date"
                autocomplete='off'
                onChange={updateInput}
              />
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Remark
            </Form.Label>
            <Col sm="4">
            <Form.Group className="mb-3" controlId="formGridAddress">   
                <Form.Control name='remarks' as="textarea" rows={3} onChange={updateInput}/>
            </Form.Group>
            </Col>
            
            <Col sm="4">
                <Button variant="success" onClick={(e) => handleClick(e)}>Save</Button>
                <Button variant="success">Modify</Button>
                <Button variant="success">Print</Button>
                <Button variant="success">Clear</Button>
            </Col>

        </Form.Group>

          </Form>
          </Container>
    </>
  )
}

export default NewPurchaseOrder
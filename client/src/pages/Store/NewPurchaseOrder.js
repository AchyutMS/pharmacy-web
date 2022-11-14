import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../../components/Layout';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

function NewPurchaseOrder() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState();

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
    
    useEffect(() => {
        getAllSuppliers();
      }, []);

    console.log(suppliers)
    console.log(selectedSupplier)
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
            <Col sm="5">
            <Form.Select aria-label="Default select example" onChange={handleSupplierSelect}>
                <option disabled>Select Supplier</option>
                {
                    suppliers && suppliers.map(item => (
                        <option value={item._id}>{item.name}</option>
                    ))
                }
            </Form.Select>
            </Col>
          </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="5">
            <Form.Group className="mb-3" controlId="formGridAddress">   
                <Form.Control as="textarea" rows={3} value={selectedSupplier?.address}/>
            </Form.Group>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Item Name
            </Form.Label>
            <Col sm="5">
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
                        // onClick={() => {
                        //     if(addMapItem(item)===false){
                        //         setMapItem([...MapItem,item])
                        //     }
                        // }
                        // }
                      >
                        {item.name}
                      </Card.Body>
                    ))}
              </Card>
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
          </tr>
        </thead>
        <tbody>

        </tbody>
      </Table>

    {/* </Container> */}
    </>
  )
}

export default NewPurchaseOrder
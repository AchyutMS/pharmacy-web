import React ,{ useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import {Container, Form, Col, Row, Card} from 'react-bootstrap'
import axios from 'axios'

function NewPurchaseOrder2() {
    const [suppliers, setSuppliers] = useState([])
    const [search, setSearch] = useState('')

    const getSuppliers = async() => {
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

    useEffect(() => {
        getSuppliers()
    },[])

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

            <Form.Control
              name="search"
              type="text"
              placeholder="Medicine Name"
              autoComplete='off'
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            <Card>
              {suppliers &&
                suppliers
                  .filter((supplier) => supplier.name.toLowerCase().includes(search))
                  .slice(0, 5)
                  .map((supplier) => (
                    <Card.Body
                      key={supplier._id}
                      className="shadow"
                      onClick={() => 
                        setSearch(supplier.name)
                      }
                    >
                      {supplier.name}
                    </Card.Body>
                  ))}
            </Card>

            {/* <Form.Select aria-label="Default select example" onChange={handleSupplierSelect}>
                <option disabled>Select Supplier</option>
                {
                    suppliers && suppliers.map(item => (
                        <option value={item._id}>{item.name}</option>
                    ))
                }
            </Form.Select> */}
            </Col>
          </Form.Group>
          </Form>
          </Container>
    </>
  )
}

export default NewPurchaseOrder2
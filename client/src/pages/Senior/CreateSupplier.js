import React, {useState, useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout';
import { useNavigate } from "react-router-dom";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';


function SupplierModal(props) {
    const [supplier, setSupplier] = useState({
        Name:'',
        oAddress:'',
    });

    const saveSupplier = async () => {
        console.log(supplier);
        try{
            const response = await axios.post('/api/senior/add-new-supplier', supplier, 
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if(response.data.success) {
              toast.success(response.data.message);
              props.onHide();
            } else {
              toast.error(response.data.message);
            }
        } catch(error) {
            console.log(error);
            toast.error("All Fields are Required");
        }
    }


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Supplier Name</Form.Label>
                    <Form.Control autocomplete="off" type="text" placeholder="Enter Supplier Name" onChange={(e)=>setSupplier({...supplier,Name:e.target.value})}/>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Supplier Address</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e)=>setSupplier({...supplier,oAddress:e.target.value})}/>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
          <Button onClick={saveSupplier}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }



function CreateSupplier() {
    const [modalShow, setModalShow] = useState(false);
    const [suppliers,setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

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

      const handleSupplierMapping = (supplier) => {
        console.log(supplier)
        
        navigate("/supplier-mapping", { state: { supplier } });
      };

      useEffect(() => {
        getAllSuppliers();
      }, []);

      console.log(suppliers)
  return (
    <>
    <Layout />
    <Container >
    <h2 className="shadow-sm text-secondary mt-5 p-3">Supplier</h2>

    <Form>
        <Form.Group as={Row} className="mb-3" controlId='formPlaintextName'>
            <Col sm="4">
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Supplier Name"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </Col>

            {/* <Col sm="2">
              <Button
                variant="success"
                size="md"
                type="submit"
              >
                Load
              </Button>
            </Col> */}

            <Col sm="6">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setModalShow(true)}
              >
                New Supplier
              </Button>
            </Col>
        </Form.Group>
    </Form>

    <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {suppliers &&
            suppliers
              .filter(
                (item) => item.Name && item.Name.toLowerCase().includes(search)
              )
              .map((item) => {
                return (
                  <tr
                    key={item._id}
                    onClick={() => handleSupplierMapping(item)}
                  >
                    <td>{item.id}</td>
                    <td>{item.Name}</td>
                    <td>{item.oAddress}</td>
                  </tr>
                );
              })}
        </tbody>
      </Table>




    </Container>

    <SupplierModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default CreateSupplier
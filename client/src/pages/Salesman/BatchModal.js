import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from "react-bootstrap/Table";

function BatchModal(props) {
    const item = props.item;
    const [ batchItems, setBatchItems ] = useState([]); 

    const getAllMedicines = async () => {
        try {
          const response = await axios.post("/api/store/get-all-batch-from-itemId", {itemId: item.id}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          });
          if (response.data.success) {
            setBatchItems(response.data.data[1]);
          }
        } catch (error) {
          console.log(error);
        }
      }


    useEffect(() => {
        getAllMedicines();
    },[item]);


    function handleSelect(selectedBatch){
        let merged = {...selectedBatch, ...item};
        props.addPrescription(merged);
    }

    // console.log('item',item);
    // console.log('batch',batchItems);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Batch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{item && item.name}</h4>
        <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Batch No.</th>
                  <th>Expiry Date</th>
                  <th>MRP</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {batchItems &&
                  batchItems.map((item) => {
                    return (
                      <tr key={item._id} onClick={() => handleSelect(item)}>
                        <td>{item.BatchNo}</td>
                        <td>{item.ExpiryDate.split(" ")[0]}</td>
                        <td>{item.MRP}</td>
                        <td>{item.Quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>    
  )
}

export default BatchModal
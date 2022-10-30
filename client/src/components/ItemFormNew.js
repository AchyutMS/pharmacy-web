import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function ItemFormNew({updateInput}) {
  return (
    <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="1">
              Item Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                onChange={updateInput}
                name="name"
                type="text"
                placeholder="Enter Item Name"
              />
            </Col>

            <Form.Label column sm="1">
              Selling Price
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="sellingprice"
                type="number"
                placeholder="Enter Selling Price"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Manufacturer ID
            </Form.Label>
            <Col sm="3">
              <Form.Control
                onChange={updateInput}
                name="manufacturerid"
                type="text"
                placeholder="Enter Mft. ID"
              />
            </Col>

            <Form.Label column sm="2">
              Manufacturer Code
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="manufacturercode"
                type="text"
                placeholder="Enter Mft. Code"
              />
            </Col>

            <Form.Label column sm="1">
              HSN Code
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="hsncode"
                type="text"
                placeholder="Enter HSN Code"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Category ID
            </Form.Label>
            <Col sm="3">
              <Form.Control
                onChange={updateInput}
                name="categoryid"
                type="number"
                placeholder="Enter Catergory ID"
              />
            </Col>

            <Form.Label column sm="2">
              Drug Type
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="drugtype"
                type="number"
                placeholder="Enter Drug Type"
              />
            </Col>

            <Form.Label column sm="1">
              Item Code
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="itemcode"
                type="text"
                placeholder="Enter Item Code"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="1">
              Unit ID
            </Form.Label>
            <Col sm="4">
              <Form.Control
                onChange={updateInput}
                name="unitid"
                type="number"
                placeholder="Enter Unit ID"
              />
            </Col>

            <Form.Label column sm="2">
              Type
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="type"
                type="number"
                placeholder="Enter Type"
              />
            </Col>

            <Form.Label column sm="1">
              Operator ID
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="OperatorId"
                type="number"
                placeholder="Enter Operator ID"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Commodity Code
            </Form.Label>
            <Col sm="3">
              <Form.Control
                onChange={updateInput}
                name="CommodityCode"
                type="number"
                placeholder="Enter Commodity Code"
              />
            </Col>

            <Form.Label column sm="2">
              Purchase Price
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="PurchasePrice"
                type="number"
                placeholder="Enter Purchase Price"
              />
            </Col>

            <Form.Label column sm="1">
              S Tax
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="S_TAX"
                type="number"
                placeholder="Enter S TAX"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="1">
              CGST
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="CGST"
                type="number"
                placeholder="Enter CGST"
              />
            </Col>

            <Form.Label column sm="1">
              SGST
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="SGST"
                type="number"
                placeholder="Enter SGST"
              />
            </Col>

            <Form.Label column sm="1">
              IGST
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="IGST"
                type="number"
                placeholder="Enter IGST"
              />
            </Col>
          </Form.Group>

          {/* <Button onClick={()=> console.log(state.item)} className="btn btn-primary btn-block">Add New Item</Button> */}
        </Form>
  )
}

export default ItemFormNew
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function ItemFormFilled({updateInput, item}) {
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
                value={item.name}
              />
            </Col>

            <Form.Label column sm="1">
              Selling Price
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="sellingprice"
                type="text"
                placeholder="Enter Selling Price"
                value={item.sellingprice}
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
                value={item.manufacturerid}
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
                value={item.manufacturercode}
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
                value={item.hsncode}
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
                type="text"
                placeholder="Enter Catergory ID"
                value={item.categoryid}
              />
            </Col>

            <Form.Label column sm="2">
              Drug Type
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="drugtype"
                type="text"
                placeholder="Enter Drug Type"
                value={item.drugtype}
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
                value={item.itemcode}
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
                type="text"
                placeholder="Enter Unit ID"
                value={item.unitid}
              />
            </Col>

            <Form.Label column sm="2">
              Type
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="type"
                type="text"
                placeholder="Enter Type"
                value={item.type}
              />
            </Col>

            <Form.Label column sm="1">
              Operator ID
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="OperatorId"
                type="text"
                placeholder="Enter Operator ID"
                value={item.OperatorId}
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
                type="text"
                placeholder="Enter Commodity Code"
                value={item.CommodityCode}
              />
            </Col>

            <Form.Label column sm="2">
              Purchase Price
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="PurchasePrice"
                type="text"
                placeholder="Enter Purchase Price"
                value={item.PurchasePrice}
              />
            </Col>

            <Form.Label column sm="1">
              S Tax
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="S_TAX"
                type="text"
                placeholder="Enter S TAX"
                value={item.S_TAX}
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
                type="text"
                placeholder="Enter CGST"
                value={item.CGST}
              />
            </Col>

            <Form.Label column sm="1">
              SGST
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="SGST"
                type="text"
                placeholder="Enter SGST"
                value={item.SGST}
              />
            </Col>

            <Form.Label column sm="1">
              IGST
            </Form.Label>
            <Col sm="2">
              <Form.Control
                onChange={updateInput}
                name="IGST"
                type="text"
                placeholder="Enter IGST"
                value={item.IGST}
              />
            </Col>
          </Form.Group>

          {/* <Button onClick={()=> console.log(state.item)} className="btn btn-primary btn-block">Add New Item</Button> */}
        </Form>
  )
}

export default ItemFormFilled;
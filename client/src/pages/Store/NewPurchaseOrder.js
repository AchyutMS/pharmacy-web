import React, { useState, useEffect } from "react";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import jwt from 'jwt-decode'
import toast from "react-hot-toast";

import Layout from '../../components/Layout';

function NewPurchaseOrder() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState();
    const [POItem, setPOItem] = useState([]);
    const [totalAmount,setTotalAmount] = useState(0);
    const token = localStorage.getItem("token");
    // const [ finalAmount, setFinalAmount ] = useState(0)
    // const [ netAmount, setNetAmount ] = useState(0)
    // const [ gstAmount, setGstAmount ] = useState(0)


  var operator;

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
    
    let [state, setState] = useState({
      // PurOrderno : "",
      OperName: operator.name,
      POType: "Normal Purchase (NP)",
      MOPay: "NEFT",
      MODispatch: "Direct dispatch by vendor",
      PTandC: "10 days payment",
      remarks: "",
      DelDateFrom : "",
      DelDateTo : "" ,
      DelTo : "SIMS vadapalani" ,
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
              if(selectedSupplier !== response.data.data){
                setPOItem([]);
                setSelectedSupplier(response.data.data);
              }
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
        if(POItem.length <= 0){
          toast.error("No items selected")
        } else {
        try {
          const response = await axios.post("/api/store/new-pur-order", {state, POItem, selectedSupplier, totalAmount}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            window.location.reload();
          }
        } catch (error) {
          toast.error("Something went Wrong")
          console.log(error);
        }
      }
      }

      const handleChange = (e,id) => {
        var newPOItem = [];

        POItem.map(item => {
          if(item.id == id){
            item[e.target.name] = parseInt(e.target.value);
          } 
          item.rate = item.qty && item.ratePerUnit && item.qty * item.ratePerUnit;
          
          // discounted_price = original_price - (original_price * discount / 100)
          item.discountAmount = item.rate;
          item.discountAmount = item.rate && item.discountPercentage && item.discountPercentage!=0 ? item.rate - (item.rate * item.discountPercentage / 100) : item.rate;
          item.discountAmount = item.discountAmount && Math.round(item.discountAmount*100)/100;

          item.GSTAmount = item.rate;
          item.GSTAmount = item.rate && item.GSTPercentage && (item.rate * item.GSTPercentage / 100);

          //Net Amount and Total Amount
          item.netAmount = item.discountAmount && item.GSTAmount && Math.round((item.discountAmount + item.GSTAmount)*100)/100;
          // console.log(typeof(item.discountAmount), typeof(item.GSTAmount))
          item.totalAmount = item.netAmount && Math.round(item.netAmount);

          newPOItem = [...newPOItem, item];
        })

        // console.log(newPOItem)
        setPOItem(newPOItem);

      } 

      // const handleOtherChange = (e,id) => {
      //   var newPOItem = [];

      //   POItem.map(item => {
      //     if(item.id == id){
      //       item[e.target.name] = parseInt(e.target.value);
      //     } 
      //     // GST Amount = (Original Cost*GST Rate Percentage) / 100
      //     item.GSTAmount = item.rate;
      //     item.GSTAmount = item.rate && item.GSTPercentage && (item.rate * item.GSTPercentage / 100);

      //     //Net Amount and Total Amount
      //     item.netAmount = item.discountAmount && item.GSTAmount && Math.round((item.discountAmount + item.GSTAmount)*100)/100;
      //     // console.log(typeof(item.discountAmount), typeof(item.GSTAmount))
      //     item.totalAmount = item.netAmount && Math.round(item.netAmount);

      //     console.log(item.netAmount, item.totalAmount)
      //     newPOItem = [...newPOItem, item];
      //   })

      //   // console.log(newPOItem)
      //   setPOItem(newPOItem);

      // } 
    
      const calculateTotalAmount = () => {
        var total = 0;
        POItem.map(item=>{
          if(item.totalAmount){
            total = total + item.totalAmount;
          } else {
            total = total;
          }
        });
        setTotalAmount(total);
      }

    useEffect(() => {
      if(suppliers.length === 0){
        getAllSuppliers();
      }
        calculateTotalAmount();
      }, [POItem]);

    // console.log(suppliers)
    // console.log(POItem)
    // console.log(selectedSupplier)
  return (
    <>
    <Layout />
    <Container>
        <h1 className={`shadow-sm text-{${color}} mt-5 p-3`}>New Purchase Order</h1>
        
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
                        <option value={item._id}>{item.Name}</option>
                    ))
                }
            </Form.Select>
            </Col>           
          </Form.Group>

          

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Supplier Address
            </Form.Label>
            <Col sm="4">
            <Form.Group className="mb-3" controlId="formGridAddress">   
                <Form.Control as="textarea" rows={3} value={selectedSupplier?.oAddress}/>
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
                autocomplete='off'
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
                <option value="Normal Purchase (NP)">Normal Purchase (NP)</option>
                <option value="Other Purchase (OP)">Other Purchase (OP)</option>
            </Form.Select>
            </Col>
        </Form.Group>
        
        </Form>


        <h2 className={`shadow-sm text-{${color}} mt-5 p-3`}>Items To Be Requested</h2>
    </Container>
        <Table striped bordered hover responsive="sm" center>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Name</th>
            {/* <th>Units</th>
            <th>Contains</th> */}
            <th>QTY</th>
            <th>Rate/Unit</th>
            <th>Rate</th>
            <th>Discount(%)</th>
            <th>GST(%)</th>
            <th>Discount Amount</th>
            <th>GST Amount</th>
            <th>Net Amount</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
              {POItem && POItem.map((item, index) => {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>
                      <input
                        type="number"
                        name="qty"
                        min="0"
                        onChange={(e)=> handleChange(e,item.id)}
                        required
                      />
                  </td>
                  <td>
                    <input
                        type="number"
                        name="ratePerUnit"
                        min="0"
                        onChange={(e)=> handleChange(e,item.id)}
                        required
                      />
                  </td>
                  <td>{item.rate && item.rate}</td>
                  <td>
                    <input
                        type="number"
                        name="discountPercentage"
                        min="0"
                        onChange={(e)=> handleChange(e,item.id)}
                        required
                      />
                  </td>
                  <td>
                  <input
                        type="number"
                        name="GSTPercentage"
                        min="0"
                        onChange={(e)=> handleChange(e,item.id)}
                        required
                      />
                  </td>
                  <td>{item.discountAmount && item.discountAmount}</td>
                  <td>{item.GSTAmount && item.GSTAmount}</td>
                  <td>{item.netAmount && item.netAmount}</td>
                  <td>{item.totalAmount && item.totalAmount}</td>
                  <td><Button variant="danger" onClick={() => removeMapItem(item)}>Remove</Button></td>
                </tr>
              )})}
        </tbody>
      </Table>
      <h2 className={`shadow-sm text-{${color}} mt-5 p-3`}>
        Total Amount: Rs. {totalAmount && totalAmount}
      </h2>
          
                <Container className="mt-5">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Mode of Payment
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="MOPay" onChange={updateInput}>
                <option value="NEFT">NEFT</option>
                <option value="Other">Other</option>
            </Form.Select>
            </Col>

            <Form.Label column sm="2">
              Mode of Dispatch
            </Form.Label>
            <Col sm="4">
            <Form.Select aria-label="Default select example" name="MODispatch" onChange={updateInput}>
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
                required
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
                required
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
            
            <Col sm="3">
                <Button variant="danger">Clear</Button>
            </Col>
             <div className="mb-2 btn btn-success col-12">
             <Button variant="success" onClick={(e) => handleClick(e)}>Save</Button>
             </div>
                    
            <Button variant="warning">Print</Button>

        </Form.Group>

          </Form>
          </Container>
    </>
  )
}

export default NewPurchaseOrder
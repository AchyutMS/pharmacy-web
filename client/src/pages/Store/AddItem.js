import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Table from "react-bootstrap/Table";
// import { useDispatch } from 'react-redux';

import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import ItemFormNew from "../../components/ItemFormNew";
import ItemFormFilled from "../../components/ItemFormFilled";

function AddItem() {
  const {operator} = useSelector((state) => state.operator);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  let [state, setState] = useState({
    item: {
      id: "",
      name: "",
      sellingprice: "",
      startdatetime: new Date().toLocaleString().replaceAll('/','-'),
      enddatetime: "NULL",
      // name1: "",
      strength: "0",
      categoryid: "",
      manufacturerid: "",
      Deleted: "NULL",
      manufacturercode: "",
      EUB: "NULL",
      profitcenter: "NULL",
      sunitid: "NULL",
      tax: "0",
      schedule: "0",
      mrpitem: "0",
      conversionqty: "1",
      drugtype: "",
      itemcode: "",
      itemcheckcompleted: "0",
      itemcheckincomplete: "0",
      deletedby: "NUll",
      unitid: "",
      type: "",
      narcotics: "0",
      cssditem: "0",
      consignment: "0",
      approval: "0",
      reusableitem: "NULL",
      reusablecount: "NULL",
      tempcatid: "NULL",
      // modifieddate: "",
      DiscountEligible: "1",
      OperatorId: "",
      blocked: "0",
      Claiming: "0",
      CommodityCode: "",
      PurchasePrice: "",
      S_TAX: "0",
      hsncode: "",
      CGST: "",
      SGST: "",
      IGST: "",
      specialisationid: "0",
      pers_itemid: "NULL",
      pers_categoryid: "NULL",
      pers_manufacturerid: "NULL",
    },
  });

  let updateInput = (e) => {
    setState({
      ...state,
      item: {
        ...state.item,
        [e.target.name]: e.target.value,
      },
    });
  };

  let [defaultBatch, setDefaultBatch] = useState({
    id: "",
    BatchNo: "",
    ExpiryDate: "",
    CostPrice: "",
    SellingPrice: "",
    Tax: "0",
    MRP: "",
    PTax: "",
    StartDate: new Date().toLocaleString().replaceAll('/','-'),
    Quantity: "",
    CONTAIN: "1",
    CONTAINCOST: "",
    userid: operator && operator.OID,
  });

  let [batch, setBatch] = useState({
    id: "",
    BatchNo: "",
    ExpiryDate: "",
    CostPrice: "",
    SellingPrice: "",
    Tax: "0",
    MRP: "",
    PTax: "",
    StartDate: new Date().toLocaleString().replaceAll('/','-'),
    Quantity: "",
    CONTAIN: "1",
    CONTAINCOST: "",
    userid: operator && operator?.OID,
  });

  let updateBatchInput = (e) => {
    setBatch({ ...batch, [e.target.name]: e.target.value });
  };

  const [batchArray, setBatchArray] = useState([]);
  const [itemId, setItemId] = useState();
  const [itemDetails, setItemDetails] = useState(null);
  const [itemBatch, setItemBatch] = useState([]);
  const [batchNoArray,setBatchNoArray] = useState([]);

  const loadItem = async (e) => {
    e.preventDefault();
    try {
      console.log('itemId',itemId);
      const response = await axios.post('/api/store/get-item-details-from-id', {itemId:itemId},
             {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
             }
           );
      if(response.data.success){
        toast.success(response.data.message);
        setItemDetails(response.data.data[0]);
        setItemBatch(response.data.data[1]);
      } else {
        toast.error(response.data.message);
        setItemDetails(null);
      }
    } catch (err) {
      console.log(err);
    }
  }


  function handleRemove(batchNo) {
    let newList = batchArray.filter((batch) => batch.BatchNo !== batchNo);
    setBatchArray(newList);

    let newArray = batchNoArray;
    console.log('lol',newArray);
    var index = batchNoArray.indexOf(batchNo);
    if(index !== -1){
      newArray.splice(index,1)
    }
    setBatchNoArray(newArray);
  }

  let saveItem = async () => {
    // console.log(state.item);
    // state.item.id = itemId;
    setItemDetails({...state.item, id: itemId});
    console.log("ITEMDETAILS PRINTING",itemDetails);
    let exists = Object.values(itemDetails).includes("");
    if(exists){
      toast.error("All Fields must be Filled");
    } else {
      const response = await axios.post('/api/store/save-item', {itemDetails},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if(response.data.success) {
            toast.success(response.data.message);
            window.location.reload(true);
          } else {
            toast.error(response.data.message);
          }
    }
  }

  let saveBatch = async () => {
      try{
          if(itemDetails == null){
            toast.error("An Item is Required")
          } else {
            batchArray.map((batch) => {
              batch.id = itemId;
              batch.MRP = batch.SellingPrice;
              batch.CONTAINCOST = batch.MRP;
              batch.userid = operator?.OID
            })
            console.log(itemDetails,batchArray);
            const response = await axios.post('/api/store/save-batch', {itemDetails,batchArray},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if(response.data.success) {
            toast.success(response.data.message);
            window.location.reload(true);
          } else {
            toast.error(response.data.message);
          }
          }

      } catch(error) {
          // dispatch(hideLoading());
          console.log(error);
          toast.error("All Fields are Required");
      }
  }

  console.log("batch Array", batchArray);
  console.log("itemDetails",itemDetails);
  console.log("Operator in additem",operator);
  console.log("ItemBatch",itemBatch);
  console.log("BatchNo",batchNoArray);
  return (
    <>
      <Layout />

      <h2 className="shadow-sm text-success mt-5 p-3">Add New Item</h2>
      <Container fluid>
        
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="1">
              Item ID
            </Form.Label>
            <Col sm="3">
              <Form.Control
                // onChange={updateInput}
                onChange={(e) => setItemId(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter Item ID"
              />
            </Col>

            <Col sm="1">
              <Button
                variant="success"
                size="md"
                type="submit"
                onClick={(e)=> loadItem(e)}
              >
                Load
              </Button>
            </Col>

            <Col sm="2">
              <Button
                variant="success"
                size="md"
                onClick={()=> saveItem()}
              >
                Save Item
              </Button>
            </Col>
          </Form.Group>
        </Form>
        
        {
          itemDetails ? <ItemFormFilled item={itemDetails} /> : <ItemFormNew updateInput={updateInput}/>
        }
        
      </Container>

      <h2 className="shadow-sm text-success mt-5 p-3">Create Batch</h2>

      <Container fluid>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Col sm="2">
              <Form.Control
                onChange={updateBatchInput}
                name="BatchNo"
                type="text"
                placeholder="Batch No."
                required
              />
            </Col>

            <Col sm="2">
              <Form.Control
                onChange={updateBatchInput}
                name="ExpiryDate"
                type="date"
                placeholder="Expiry Date"
              />
            </Col>

            <Col sm="2">
              <Form.Control
                onChange={updateBatchInput}
                name="CostPrice"
                type="number"
                placeholder="Cost Price"
              />
            </Col>

            <Col sm="2">
              <Form.Control
                onChange={updateBatchInput}
                name="SellingPrice"
                type="number"
                placeholder="Selling Price"
              />
            </Col>

            <Col sm="2">
              <Form.Control
                onChange={updateBatchInput}
                name="PTax"
                type="number"
                placeholder="P Tax"
              />
            </Col>

            <Col sm="1">
              <Form.Control
                onChange={updateBatchInput}
                name="Quantity"
                type="number"
                placeholder="Quantity"
              />
            </Col>


            <Col sm="1">
              <Button
                type="reset"
                variant="success"
                size="sm"
                onClick={() => {
                    if(itemDetails==null){
                      toast.error("Item not loaded")
                    } else{
                    if(itemBatch.includes(batch.BatchNo) || batchNoArray.includes(batch.BatchNo)){
                      toast.error("BatchNo. in Use")
                    } else {
                    if(batch.BatchNo!=="" && batch.ExpiryDate!=="" && batch.CostPrice!=="" && batch.SellingPrice!=="" && batch.Quantity!==""){
                      setBatchArray([...batchArray, batch]);
                      setBatchNoArray([...batchNoArray,batch.BatchNo]);
                      setBatch(defaultBatch);
                    }
                    }
                }}}
              >
                Add
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>

      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Batch No.</th>
              <th>Expiry Date</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>MRP</th>
              <th>PTax</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {batchArray &&
              batchArray.map((item) => {
                return (
                  <tr key={item.BatchNo}>
                    <td>{item.BatchNo}</td>
                    <td>{item.ExpiryDate}</td>
                    <td>{item.CostPrice}</td>
                    <td>{item.SellingPrice}</td>
                    <td>{item.SellingPrice}</td>
                    <td>{item.PTax}</td>
                    <td>{item.Quantity}</td>
                    <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemove(item.BatchNo)}
                          >
                            Delete
                          </Button>
                        </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

         <Button onClick={()=> saveBatch()} className="btn btn-success btn-block">Save Batch</Button>
      </Container>
    </>
  );
}

export default AddItem;
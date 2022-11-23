import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


function SupplierMapping() {
  
  const { state } = useLocation();
  const { supplier } = state || {};
  
  const navigate = useNavigate();
  // const supplierId = sessionStorage.getItem("supplier");
  const [itemMaster, setItemMaster] = useState([]);
  const [search, setSearch] = useState("");
  const [MapItem, setMapItem] = useState(supplier.items);

  const getAllItemMaster = async () => {
    try {
      const response = await axios.get("/api/store/get-all-item-details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        console.log(response);
        setItemMaster(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMapItem = (item) => {
    console.log(MapItem)
    var i;
    for (i = 0; i < MapItem.length; i++) {
      // console.log(MapItem[i], 'ok', item, 'inside for loop')
        if (MapItem[i].name === item.name && MapItem[i].id === item.id) {
            return true;
        }
    }

    return false;
  }

  const removeMapItem = (item) => {
    setMapItem(arr => (
      arr.filter((value, i) => value !== item)
    ));
  }

  const saveItems = async () => {
    try {
      const response = await axios.post("/api/senior/save-supplier", {supplier, MapItem} , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/supplier");
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getAllItemMaster();
  }, []);


  return (
    <>
      <Layout />
      <Container>
      <h1 className={`shadow-sm text-secondary mt-5 p-3`}>{supplier && supplier.Name}</h1>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPhoneNumber"
          >
            <Col sm="6">
              <Form.Control
                name="search"
                type="text"
                placeholder="Search Medicine Name to Map"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <Card className="border-secondary mb-3 mt-3">
                {itemMaster &&
                  itemMaster
                    .filter((item) => item.name.toLowerCase().includes(search))
                    .slice(0, 10)
                    .map((item) => (
                      <Card.Body
                        className="shadow"
                        key={item._id}
                        onClick={() => {
                            if(addMapItem(item)===false){
                                setMapItem([...MapItem,item])
                            }
                        }
                        }
                      >
                        {item.name}
                      </Card.Body>
                    ))}
              </Card>
            </Col>

            <Col sm="6">
            <Form.Control
                value="Mapped Items"
              />
              <Card className="border-success mb-3 mt-3">
                    {MapItem && 
                    MapItem.map((item) => (
                      <Card.Body
                          className="shadow"
                          key={item._id}
                          onClick={() => {
                              removeMapItem(item)
                          }
                          }
                        >
                          {item.name}
                        </Card.Body>
                    ))
                    }
              </Card>
            </Col>


          </Form.Group>
          <div
              className="m-3 d-flex justify-content-end"
            //   onClick={generateBill}
            >
              <Button variant="primary" size="lg" onClick={saveItems}>
                Save 
              </Button>
            </div>
        </Form>
      </Container>
    </>
  );
}

export default SupplierMapping;

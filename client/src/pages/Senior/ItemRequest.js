import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";

export default function ItemRequest() {
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    try {
      const response = await axios.get("/api/senior/check-request-item", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setItem(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const DeleteItem = async (id) => {
    try {
      const response = await axios.post(
        "/api/senior/delete-item",
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchItem();
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error Try Again Later");
    }
  };

  return (
    <>
      <Layout />
      <h1 className="shadow-sm text-secondary mt-5 p-3 ">Item Requests</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {item &&
            item.map((medicine) => {
              return (
                <tr key={medicine.id}>
                  <td>{medicine.id}</td>
                  <td>{medicine.name}</td>
                  <td>
                    <Button variant="warning" onClick={() => DeleteItem(medicine.id)}>
                      Mark As Requested
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

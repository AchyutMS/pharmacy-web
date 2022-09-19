import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function CategoryMedicines() {
    //const location = useLocation();
    //const categoryId = location.state.id;
    const categoryId = sessionStorage.getItem('category');
    const [ category, setCategory ] = useState(''); 
    const [ items, setItems] = useState([])
    console.log(categoryId);

    const getAllMedicines = async () => {
        try {
          const response = await axios.post("/api/store/get-all-items-from-category", {categoryId: categoryId}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          });
          if (response.data.success) {
            setItems(response.data.data[1]);
            setCategory(response.data.data[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        getAllMedicines();
    },[]);

    console.log(items)
  return (
    <>
        <Layout />
        <h1 className="shadow-sm text-primary mt-5 p-3">{category && category}</h1>
        <p><b>(These Columns are temporary, it has to be changed after asking sir)</b></p>

        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Item Code</th>
          <th>Selling Price</th>
          <th>Manufacturer ID</th>
        </tr>
      </thead>
      <tbody>

        {
          items && items.map((item) => {
            return (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.itemcode}</td>
              <td>{item.sellingprice}</td>
              <td>{item.manufacturerid}</td>
            </tr>
            )
          })
        }
      </tbody>
      
    </Table>

    </>
  )
}

export default CategoryMedicines
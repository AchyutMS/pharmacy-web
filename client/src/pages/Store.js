import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import Table from 'react-bootstrap/Table';

function Store() {
  const [ itemGroup, setItemGroup] = useState([]);
  const navigate = useNavigate();

  const getAllMedicineCategories = async () => {
    try {
      const response = await axios.get("/api/store/get-all-item-group", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.data.success) {
        setItemGroup(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleCategoryMedicine = (itemId) => {
    sessionStorage.setItem('category', itemId);
    // navigate('/category-medicines',{state:{id:itemId}});
    navigate('/category-medicines');
  }

  console.log(itemGroup)
  
  useEffect(() => {
    getAllMedicineCategories();
  },[]);

  return (
    <>
      <Layout />
      <h1 className="shadow-sm text-primary mt-5 p-3">Store</h1>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Parent</th>
          <th>Modified Date</th>
          <th>Blocked</th>
          <th>Pers_catid</th>
        </tr>
      </thead>
      <tbody>

        {
          itemGroup && itemGroup.map((item) => {
            return (
            <tr key={item._id} onClick={()=> handleCategoryMedicine(item.id)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.parent}</td>
              <td>{item.ModifiedDate}</td>
              <td>{item.blocked}</td>
              <td>{item.pers_catid}</td>
            </tr>
            )
          })
        }
      </tbody>
      
    </Table>
    </>
    
  )
}

export default Store
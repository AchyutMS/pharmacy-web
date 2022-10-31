import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'

export default function ItemRequest() {

  const [ item, setItem ] = useState([])

  const fetchItem = async() => {
    try{
      const response = await axios.get('/api/senior/check-request-item',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setItem(response.data.data);
      }
    }
    catch(err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchItem()
  
  },[])

  const DeleteItem = async(id) => {

    try{
      const response = await axios.post('/api/senior/delete-item',{id},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchItem()
      }
    }
    catch(err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <Layout />
      <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                    {
                      item && item.map(medicine => {
                        return (
                          <tr>
                            <td>{medicine.id}</td>
                            <td>{medicine.name}</td>
                            <td><Button onClick={() => DeleteItem(medicine.id)}>Requested</Button></td>
                          </tr>
                        )
                      })
                    }
              </tbody>
            </Table>
    </>
  )
}

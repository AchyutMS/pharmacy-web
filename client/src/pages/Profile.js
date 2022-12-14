import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import jwt from "jwt-decode";
import Layout from '../components/Layout';



function Profile() {
  const token = localStorage.getItem("token");
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
        user: {
            name:operator?.name,
            email:operator?.email,
            phoneNumber:operator?.phoneNumber,
            role: operator?.role,
            password:'',
        }
    });

    let updateInput = (e) => {
        setState({
            ...state,
            user: {
                ...state.user,
                [e.target.name] : e.target.value
            }
        })
    }


    let updateProfile = async () => {
        try{
          console.log(state.user)
            const response = await axios.post('/api/operator/update-operator-profile', {user: state.user}, 
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if(response.data.success) {
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message);
            }
        } catch(error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
    <>
    <Layout />
    <Container>
      <h1 className={`shadow-sm text-${color} mt-5 p-3 text-center`}>My Profile</h1>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="name" type="text" placeholder={operator?.name} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="email" type="text" placeholder={operator?.email} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhoneNumber">
        <Form.Label column sm="2">
          Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="phoneNumber" type="number" placeholder={operator?.phoneNumber}  />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextRole">
      <Form.Label column sm="2">
          Role
        </Form.Label>
        <Col sm="10">
        <Form.Select aria-label="Default select example" name="role" onChange={updateInput}>
        <option disabled>Select Role</option>
        <option value={operator?.role}>{operator?.role}</option>
      </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="password" type="password" placeholder="New Password" />
        </Col>
      </Form.Group>

      <Button onClick={()=>updateProfile()} className={`btn btn-${color} btn-block`}>Save</Button>
    </Form>
    </Container>
    </>
  );
}

export default Profile;
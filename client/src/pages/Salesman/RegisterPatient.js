import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from '../../components/Layout';
import { showLoading, hideLoading } from '../../redux/alertsSlice';

function RegisterOperator() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [state, setState] = useState({
        user: {
            name:'',
            phoneNumber: '',
            age:'',
            sex:'',
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

    let register = async () => {
        console.log(state.user);
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/salesman/register-patient', state.user, 
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if(response.data.success) {
              toast.success(response.data.message);
              navigate('/op-pharmacy-billing');
            } else {
              toast.error(response.data.message);
            }
        } catch(error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error("All Fields are Required");
        }
    }

  return (
    <>
    <Layout />
    <Container>
      <h1 className='shadow-sm text-primary mt-5 p-3 text-center'>Create a New Patient Record</h1>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="name" type="text" placeholder="Enter name" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhoneNumber">
        <Form.Label column sm="2">
          Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="phoneNumber" type="number" placeholder="Enter phone number" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
        <Form.Label column sm="2">
          Age
        </Form.Label>
        <Col sm="10">
          <Form.Control onChange={updateInput} name="age" type="number" placeholder="Enter age" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextSex">
      <Form.Label column sm="2">
          Sex
        </Form.Label>
        <Col sm="10">
        <Form.Select required aria-label="Default select example" name="sex" onChange={updateInput}>
        <option></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </Form.Select>
        </Col>
      </Form.Group>

      <Button onClick={register} className="btn btn-primary btn-block">Create New Patient</Button>
    </Form>
    </Container>
    </>
  );
}

export default RegisterOperator;

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { showLoading, hideLoading } from '../redux/alertsSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [state, setState] = useState({
        user: {
            name:'',
            email:'',
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

    let register = async () => {
        console.log(state.user);
        try{
            dispatch(showLoading());
            const response = await axios.post('/api/user/register', state.user);
            dispatch(hideLoading());
            if(response.data.success) {
              toast.success(response.data.message);
              navigate('/login');
            } else {
              toast.error(response.data.message);
            }
        } catch(error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
    <>
    <Container>
      <h1 className='shadow-sm text-primary mt-5 p-3 text-center'>Create an Account</h1>
      <Row className='mt-3'>
        <Col lg={5} md={6} sm={12} className='p-5 m-auto shadow-sm rounded-lg'>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={updateInput} type="text"  name="name" placeholder="Enter Name"></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={updateInput} type="email" name="email" placeholder="Enter Email"></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={updateInput} type="password" name="password" placeholder="Create Password"></Form.Control>
            </Form.Group>
            <Button onClick={register} className="btn btn-primary btn-block">Sign Up</Button>
            <a href='/login' className='text-secondary mt-5 p-3 text-center'>Click Here to Login</a>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Register;

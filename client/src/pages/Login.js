import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/alertsSlice";
import logo from "../sims-Logo-new.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [state, setStates] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  let updateInput = (e) => {
    setStates({
      ...state,
      user: {
        ...state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  let login = async (e) => {
    e.preventDefault();
    console.log(state.user);
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/operator/login", state.user);
      dispatch(hideLoading());
      if (response.data.success) {
        console.log("LOGIN SUCCESS");
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Navbar bg="light">
        <Container className="d-flex justify-content-center mt-5" >
          <div><img src={logo} alt="" height={100}/></div>
        </Container>
      </Navbar>
      <Container>
        <h1 className="shadow-sm text-primary mt-1 p-3 text-center">
          Login To Your Account
        </h1>
        
        <Row className="mt-3">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={updateInput}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={updateInput}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                ></Form.Control>
              </Form.Group>
              <Button
                // type="submit"
                onClick={(e) => login(e)}
                className="btn btn-primary btn-block"
              >
                Sign In
              </Button>
              <a
                href="/register-operator"
                className="text-secondary mt-5 p-3 text-center"
              >
                Click here for support
              </a>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
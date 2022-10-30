import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setOperator } from "../redux/operatorSlice"
import jwt from 'jwt-decode'
import axios from 'axios';

function ProtectedRoute(props) {
    const { operator } = useSelector((state) => state.operator);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  
    useEffect(() => {
      if(!operator){
        dispatch(setOperator(jwt(localStorage.getItem('token'))))
      }
    }, [operator]);

    console.log("Operator Info",operator);
    if (operator) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
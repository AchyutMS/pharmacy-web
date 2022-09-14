import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setOperator } from "../redux/operatorSlice"

import axios from 'axios';

function ProtectedRoute(props) {
    const { operator } = useSelector((state) => state.operator);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getUser = async () => {
      try {
        //dispatch(showLoading())
        const response = await axios.post(
          "/api/operator/get-operator-info-by-id",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        //dispatch(hideLoading());
        if (response.data.success) {
          dispatch(setOperator(response.data.data));
        } else {
          console.log('error',response);
          localStorage.clear()
          navigate("/login");
        }
      } catch (error) {
        console.log('catch',error)
        //dispatch(hideLoading());
        localStorage.clear()
        navigate("/login");
      }
    };
  
    useEffect(() => {
      if (!operator) {
        getUser();
      }
    }, [operator]);
    console.log("Operator Info",operator);
    if (localStorage.getItem("token")) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
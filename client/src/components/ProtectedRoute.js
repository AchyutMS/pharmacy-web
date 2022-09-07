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
          "/api/user/get-user-info-by-id",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response)
        //dispatch(hideLoading());
        if (response.data.success) {
          dispatch(setOperator(response.data.data));
        } else {
          localStorage.clear()
          navigate("/login");
        }
      } catch (error) {
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
    console.log("User",operator);
    if (localStorage.getItem("token")) {
      return props.children;
    } else {
      return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
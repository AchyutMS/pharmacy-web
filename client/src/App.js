import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//Import Components
import RegisterOperator from "./pages/Admin/RegisterOperator";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Operators from "./pages/Admin/Operators";

import OpPharmacyBilling from "./pages/Salesman/OpPharmacyBilling";
import RegisterPatient from "./pages/Salesman/RegisterPatient";
import NewBill from "./pages/Salesman/NewBill";
import Store from "./pages/Store";
import CategoryMedicines from "./pages/CategoryMedicines";
import Stock from './pages/Stock';
import Batch from './pages/Batch';
import Profile from './pages/Profile';
import ItemRequest from './pages/Senior/ItemRequest';

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import { useSelector } from 'react-redux';
import PatientRecord from "./pages/Salesman/PatientRecord";

import AddItem from "./pages/Store/AddItem";
import jwt from 'jwt-decode'

function App() {
  const { loading } = useSelector((state) => state.alerts);

  const token = localStorage.getItem("token")
  var user

  if(token) {
    user = jwt(token)
    console.log(user.operator)

    console.log(user)
  }

  return (
    <BrowserRouter>
      { loading && (
        <div className="spinner-parent">
          <div className="spinnerborder" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
        <Route path="/register-operator" element={<ProtectedRoute> <RegisterOperator /> </ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/operators" element={<ProtectedRoute> <Operators /> </ProtectedRoute>} />
        <Route path="/op-pharmacy-billing" element={<ProtectedRoute> <OpPharmacyBilling /> </ProtectedRoute>} />
        <Route path="/register-patient" element={<ProtectedRoute> <RegisterPatient /> </ProtectedRoute>} />
        <Route path="/new-bill" element={<ProtectedRoute> <NewBill /> </ProtectedRoute>} />
        <Route path="/store" element={<ProtectedRoute> <Store /> </ProtectedRoute>} />
        <Route path="/category-medicines" element={<ProtectedRoute> <CategoryMedicines /> </ProtectedRoute>} />
        <Route path="/stock" element={<ProtectedRoute> <Stock /> </ProtectedRoute>} />
        <Route path="/batch" element={<ProtectedRoute> <Batch /> </ProtectedRoute>} />
        <Route path="/patient-record/:id" element={<ProtectedRoute> <PatientRecord /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

        <Route path="/add-item" element={<ProtectedRoute> <AddItem /> </ProtectedRoute>} />
       */}

{
          user ?
          user.operator.role === "admin" ? 
          <Route path='/register-operator' element={<RegisterOperator />} /> : 
          <Route path='/register-operator' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/register-operator' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "admin" ? 
          <Route path='/operators' element={<Operators />} /> : 
          <Route path='/operators' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/operators' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "salesman" ? 
          <Route path='/op-pharmacy-billing' element={<OpPharmacyBilling />} /> : 
          <Route path='/op-pharmacy-billing' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/op-pharmacy-billing' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "salesman" ? 
          <Route path='/register-patient' element={<RegisterPatient />} /> : 
          <Route path='/register-patient' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/register-patient' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "salesman" ? 
          <Route path='/new-bill' element={<NewBill />} /> : 
          <Route path='/new-bill' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/new-bill' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          <Route path='/store' element={<Store />} /> : 
          <Route path='/store' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          <Route path='/category-medicines' element={<CategoryMedicines />} /> : 
          <Route path='/category-medicines' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          <Route path='/stock' element={<Stock />} /> : 
          <Route path='/stock' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          <Route path='/batch' element={<Batch />} /> : 
          <Route path='/batch' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "salesman" ? 
          <Route path='/patient-record/:id' element={<PatientRecord />} /> : 
          <Route path='/patient-record/:id' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/patient-record/:id' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          <Route path='/profile' element={<Profile />} /> : 
          <Route path='/profile' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "store" ? 
          <Route path='/add-item' element={<AddItem />} /> : 
          <Route path='/add-item' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/add-item' exact element={<Navigate replace to="/login" />} />
          }

{
          user ?
          user.operator.role === "senior" ? 
          <Route path='/check-request' element={<ItemRequest />} /> : 
          <Route path='/check-request' exact element={<Navigate replace to="/" />} /> : 
          <Route path='/check-request' exact element={<Navigate replace to="/login" />} />
          }

          { user ?
           <Route path='/' exact element={<Home />} />  : 
           <Route path='/' exact element={<Navigate replace to="/login" />} />

          }

        {user ? 
            <Route path='/login' exact element={<Navigate replace to="/" />} /> : 
            <Route path='/login' exact element={<Login />} />
        }
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;

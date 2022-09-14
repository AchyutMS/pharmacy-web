import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//Import Components
import RegisterOperator from "./pages/Admin/RegisterOperator";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Operators from "./pages/Admin/Operators";

import OpPharmacyBilling from "./pages/Salesman/OpPharmacyBilling";
import RegisterPatient from "./pages/Salesman/RegisterPatient";
import PatientRecords from "./pages/Salesman/PatientRecords";
import NewBill from "./pages/Salesman/NewBill";
import Store from "./pages/Store";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import { useSelector } from 'react-redux';

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      { loading && (
        <div className="spinner-parent">
          <div className="spinnerborder" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
        {/* <Route path="/register-operator" element={<RegisterOperator />} /> */}
        <Route path="/register-operator" element={<ProtectedRoute> <RegisterOperator /> </ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/operators" element={<ProtectedRoute> <Operators /> </ProtectedRoute>} />
        <Route path="/op-pharmacy-billing" element={<ProtectedRoute> <OpPharmacyBilling /> </ProtectedRoute>} />
        <Route path="/register-patient" element={<ProtectedRoute> <RegisterPatient /> </ProtectedRoute>} />
        <Route path="/patient-records" element={<ProtectedRoute> <PatientRecords /> </ProtectedRoute>} />
        <Route path="/new-bill" element={<ProtectedRoute> <NewBill /> </ProtectedRoute>} />
        <Route path="/store" element={<ProtectedRoute> <Store /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

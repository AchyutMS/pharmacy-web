import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//Import Components
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

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
        <Route path="/register" element={<PublicRoute> <Register /> </PublicRoute>} />
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

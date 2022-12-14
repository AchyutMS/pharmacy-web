import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";

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
import Stock from "./pages/Stock";
import Batch from "./pages/Batch";
import Profile from "./pages/Profile";
import ItemRequest from "./pages/Senior/ItemRequest";
import PatientRecord from "./pages/Salesman/PatientRecord";
import AddItem from "./pages/Store/AddItem";
import CreateSupplier from "./pages/Senior/CreateSupplier";
import SupplierMapping from "./pages/Senior/SupplierMapping";
import PurchaseOrder from "./pages/Store/PurchaseOrder";
import NewPurchaseOrder from "./pages/Store/NewPurchaseOrder";
import PurchaseOrderDetails from "./pages/Store/PurchaseOrderDetails";
import GRNDetails from "./pages/Store/GRNDetails";
import GRN from "./pages/Store/GRN";
import NewGRN from "./pages/Store/NewGRN";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  const token = localStorage.getItem("token");
  var user;

  if (token) {
    user = jwt(token);
  }

  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinnerborder" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {user ? (
          user.operator.role === "admin" ? (
            <Route path="/register-operator" element={<RegisterOperator />} />
          ) : (
            <Route
              path="/register-operator"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/register-operator"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "admin" ? (
            <Route path="/operators" element={<Operators />} />
          ) : (
            <Route
              path="/operators"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/operators"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "salesman" ? (
            <Route
              path="/op-pharmacy-billing"
              element={<OpPharmacyBilling />}
            />
          ) : (
            <Route
              path="/op-pharmacy-billing"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/op-pharmacy-billing"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "salesman" ? (
            <Route path="/register-patient" element={<RegisterPatient />} />
          ) : (
            <Route
              path="/register-patient"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/register-patient"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "salesman" ? (
            <Route path="/new-bill" element={<NewBill />} />
          ) : (
            <Route
              path="/new-bill"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/new-bill"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          <Route path="/store" element={<Store />} />
        ) : (
          <Route
            path="/store"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          <Route path="/category-medicines" element={<CategoryMedicines />} />
        ) : (
          <Route
            path="/category-medicines"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          <Route path="/stock" element={<Stock />} />
        ) : (
          <Route
            path="/stock"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          <Route path="/batch" element={<Batch />} />
        ) : (
          <Route
            path="/batch"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "salesman" ? (
            <Route path="/patient-record/:id" element={<PatientRecord />} />
          ) : (
            <Route
              path="/patient-record/:id"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/patient-record/:id"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route
            path="/profile"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "store" ? (
            <Route path="/add-item" element={<AddItem />} />
          ) : (
            <Route
              path="/add-item"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/add-item"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "store" || user.operator.role==="senior" ? (
            <Route path="/purchase-order" element={<PurchaseOrder />} />
          ) : (
            <Route
              path="/purchase-order"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/purchase-order"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "store" || user.operator.role==="senior" ? (
            <Route path="/GRN/:grnNumber" element={<GRNDetails />} />
          ) : (
            <Route
              path="/GRN/:grnNumber"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/GRN/:grnNumber"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}


        {user ? (
          user.operator.role === "store" || user.operator.role === "senior" ? (
            <Route path="/new-purchase-order" element={<NewPurchaseOrder />} />
          ) : (
            <Route
              path="/new-purchase-order"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/new-purchase-order"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}


        {user ? (
          user.operator.role === "store" || user.operator.role === "senior" ? (
            <Route path="/purchase-order/:id" element={<PurchaseOrderDetails />} />
          ) : (
            <Route
              path="/purchase-order/:id"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/patient-record/:id"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        
        {user ? (
          user.operator.role === "store" || user.operator.role === "senior" ? (
            <Route path="/grn" element={<GRN />} />
          ) : (
            <Route
              path="/grn"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/grn"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "store" || user.operator.role === "senior" ? (
            <Route path="/new-grn" element={<NewGRN />} />
          ) : (
            <Route
              path="/new-grn"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/new-grn"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "senior" ? (
            <Route path="/check-request" element={<ItemRequest />} />
          ) : (
            <Route
              path="/check-request"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/check-request"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        {user ? (
          user.operator.role === "senior" ? (
            <Route path="/supplier" element={<CreateSupplier />} />
          ) : (
            <Route
              path="/supplier"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/supplier"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}

        
        {user ? (
          user.operator.role === "senior" ? (
            <Route path="/supplier-mapping" element={<SupplierMapping />} />
          ) : (
            <Route
              path="/supplier-mapping"
              exact
              element={<Navigate replace to="/" />}
            />
          )
        ) : (
          <Route
            path="/supplier-mapping"
            exact
            element={<Navigate replace to="/login" />}
          />
        )}


        {user ? (
          <Route path="/" exact element={<Home />} />
        ) : (
          <Route path="/" exact element={<Navigate replace to="/login" />} />
        )}

        {user ? (
          <Route path="/login" exact element={<Navigate replace to="/" />} />
        ) : (
          <Route path="/login" exact element={<Login />} />
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

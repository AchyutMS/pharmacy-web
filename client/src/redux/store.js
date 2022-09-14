import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertsSlice } from "./alertsSlice";
import { operatorSlice } from "./operatorSlice";
import { patientSlice } from "./patientSlice";


const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  operator: operatorSlice.reducer,
  patient: patientSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
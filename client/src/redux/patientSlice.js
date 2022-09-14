import { createSlice } from '@reduxjs/toolkit';

export const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        patient: null,
    },
    reducers: {
        setPatient : (state, action) => {
            state.patient = action.payload
        }
    },
});

export const { setPatient } = patientSlice.actions;
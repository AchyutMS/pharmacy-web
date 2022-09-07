import { createSlice } from "@reduxjs/toolkit";


export const operatorSlice = createSlice({
    name: "operator",
    initialState: {
        operator: null,
    },
    reducers: {
        setOperator: (state, action) => {
            state.operator = action.payload
        }
    },
});

export const { setOperator } = operatorSlice.actions;
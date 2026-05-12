import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hasShownIdAlert: false
}

export const alertSlice = createSlice({
    name: "alertSlice",
    initialState,
    reducers: {
        setHasShownIdAlert: (state, action) => {
            state.hasShownIdAlert = action.payload;
        },
        resetAlertState: (state) => {
            state.hasShownIdAlert = false;
        }
    }
})

export const { setHasShownIdAlert, resetAlertState } = alertSlice.actions;
export default alertSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminToken: null
}

export const admintokenSlice = createSlice({
    name: 'adminToken',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.adminToken = action.payload
        },
        removeToken: (state) => {
            state.adminToken = null
        }
    }
})

export const { addToken, removeToken } = admintokenSlice.actions
export default admintokenSlice.reducer

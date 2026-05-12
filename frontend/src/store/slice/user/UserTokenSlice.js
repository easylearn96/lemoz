import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: null
}

export const tokenSlice = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.userToken = action.payload
        },
        removeToken: (state) => {
            state.userToken = null
        }
    }
})

export const { addToken, removeToken } = tokenSlice.actions
export default tokenSlice.reducer

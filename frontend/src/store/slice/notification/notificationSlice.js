import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notification: []
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotifications: (state, action) => {
            state.notification = action.payload
        },
        removeNotification: (state, action) => {
            state.notification = state.notification.filter((notification) => notification._id !== action.payload)
        },
        addSingleNotification: (state, action) => {
            state.notification.push(action.payload)
        },
        clearAllNotifications: (state, action) => {
            state.notification = action.payload
        }
    }
})

export const { addNotifications, removeNotification, addSingleNotification, clearAllNotifications } = notificationSlice.actions
export default notificationSlice.reducer

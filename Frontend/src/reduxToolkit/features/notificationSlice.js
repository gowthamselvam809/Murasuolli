import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: [],
}

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotification: (state, action) => {
      state.value = [...state.value, action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { getNotification } = notificationSlice.actions

export default notificationSlice.reducer
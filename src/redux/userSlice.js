import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    cart: null,
    orders: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, actions) => {
            state.user = actions.payload
        },
        updateCart: (state, actions) => {
            state.cart = actions.payload
        },
        updateOrders: (state, actions) => {
            state.orders = actions.payload
        },
    }
})

export const { updateUser, updateCart, updateOrders } = userSlice.actions
export default userSlice.reducer
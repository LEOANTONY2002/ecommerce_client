import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkTheme: false
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        updateTheme: (state) => {
            state.darkTheme = !state.darkTheme
        }
    }
})

export const { updateTheme } = themeSlice.actions
export default themeSlice.reducer
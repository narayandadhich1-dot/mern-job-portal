import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setLoading, setUser, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
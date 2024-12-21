import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage if available
    token: localStorage.getItem("token") || null, // Load token from localStorage if available
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      // Save the user data in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setToken: (state, action) => {
      // Save the token in localStorage
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    clearUser: (state) => {
      // Clear user data from localStorage and state
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLoading, setUser, setToken, clearUser } = authSlice.actions;

export default authSlice.reducer;

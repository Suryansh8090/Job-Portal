// src/public/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';  // Import auth slice reducer

const store = configureStore({
  reducer: {
    auth: authReducer,  // Attach auth reducer to the store
  },
});

export default store;

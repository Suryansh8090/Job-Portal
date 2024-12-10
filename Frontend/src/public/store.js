import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../public/authslice"

const store = configureStore({
    reducer:{
       auth:authSlice
    }
})


export default store
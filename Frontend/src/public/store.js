import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authslice"; // Make sure your imports are named correctly
import jobSlice from "./jobslice";
import companySlice from "./companyslice";
import applicationSlice from "./applicantionslice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer, // Ensure this matches the default export in authslice.js
  job: jobSlice,
  company: companySlice,
  application: applicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // Export the persistor for use in the app
export default store;

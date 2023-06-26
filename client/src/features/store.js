import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice";
import reduxCustomer from "./reduxCustomer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: reduxCustomer,
  },
});

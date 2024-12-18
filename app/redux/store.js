import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice";
import fansReducer from "./features/fan.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fan: fansReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice.reducer,
    userReducer: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

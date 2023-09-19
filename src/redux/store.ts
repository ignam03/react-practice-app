import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, userSlice } from "./slices";
import { episodeSlice } from "./slices/episode.slice";

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice.reducer,
    userReducer: userSlice.reducer,
    episodeReducer: episodeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

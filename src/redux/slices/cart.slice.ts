import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartAddState {
  id: string | number;
  name: string;
  image: string;
  info: string;
}

export interface CartRemoveState {
  id: string | number;
}

const initialState: CartAddState[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartAddState>) => {
      const { id } = action.payload;
      if (
        state.length === 0 ||
        state.filter((item) => item.id === id).length === 0
      ) {
        state.push(action.payload);
      }
    },
    removeToCart: (state, action: PayloadAction<CartRemoveState>) => {
      const { id } = action.payload;
      if (state.some((item) => item.id === id)) {
        return (state = state.filter((item) => item.id !== id));
      }
    },
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;

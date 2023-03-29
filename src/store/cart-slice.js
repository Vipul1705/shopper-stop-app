import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const initialCartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exisitingItems = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!exisitingItems) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exisitingItems.quantity++;
        exisitingItems.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const exisitingItems = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (exisitingItems.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exisitingItems.quantity--;
        exisitingItems.totalPrice -= exisitingItems.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map(
          (cartItem) => (cartItem._id === item._id ? { ...item } : cartItem) //!Note: There's no need to manually increment the quantity count, as the user will specify the desired quantity when adding an item to the cart. Any changes to the quantity on the cart or product screen will be handled by passing the entire cartItem object as a payload, including the updated quantity.
        );
      } else state.cartItems = [...state.cartItems, item];

      return updateCart(state); // This function returns an updated state and that counts as a state update. So, the state of the slice will be updated.
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload._id
      );
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

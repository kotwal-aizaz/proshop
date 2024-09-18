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
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === item._id ? { ...item, qty: item.qty + 1} : cartItem
        );
      } else state.cartItems = [...state.cartItems, item];
      /*
       const itemsPrice = state.cartItems.reduce(
         (acc, item) => acc + (item.price * 100 * item.qty) / 100,
         0
       );
       state.itemsPrice = addDecimals(itemsPrice);

       // Calculate the shipping price
       const shippingPrice = itemsPrice > 100 ? 0 : 10;
       state.shippingPrice = addDecimals(shippingPrice);

       // Calculate the tax price
       const taxPrice = 0.15 * itemsPrice;
       state.taxPrice = addDecimals(taxPrice);

       const totalPrice = itemsPrice + shippingPrice + taxPrice;
       // Calculate the total price
       state.totalPrice = addDecimals(totalPrice);

       // Save the cart to localStorage
       localStorage.setItem("cart", JSON.stringify(state));

      */
     return updateCart(state) // This function returns an updated state and that counts as a state update. So, the state of the slice will be updated.  
      
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

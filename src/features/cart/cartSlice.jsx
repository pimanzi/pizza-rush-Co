import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increasingItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreasingItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addItem,
  deleteItem,
  increasingItem,
  decreasingItem,
  clearCart,
} = cartSlice.actions;

export function getTotalCartQuantity(store) {
  return store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getTotalCartPrice(store) {
  return store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
}

export function getCart(store) {
  return store.cart.cart;
}

export function getPresenceOfItemInCart(store, id) {
  return store.cart.cart.some((item) => item.pizzaId === id);
}

export function getItemQuantity(store, id) {
  const item = store.cart.cart.find((item) => item.pizzaId === id);
  return item?.quantity;
}

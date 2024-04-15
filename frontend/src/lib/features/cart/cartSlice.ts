import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Product } from "@/interfaces/product";
import { RootState } from "../../store";
import { Catalog } from "@/interfaces/catalog";

type CartState = {
  items: { [id: number]: Product };
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Catalog>) {
      const product = action.payload;

      if (state.items[product.id]) {
        state.items[product.id] = {
          ...state.items[product.id],
          quantity: 1,
        };
      } else {
        state.items[product.id] = { ...product, quantity: 1 };
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;

      delete state.items[id];
    },
    increment(state, action: PayloadAction<number>) {
      const id = action.payload;
      const newIncrement = state.items[id].quantity + 1;
      if (state.items[id] && newIncrement <= state.items[id].stock)
        state.items[id] = {
          ...state.items[id],
          quantity: newIncrement,
        };
    },
    decrement(state, action: PayloadAction<number>) {
      const id = action.payload;

      const newDecrement = state.items[id].quantity - 1;
      if (state.items[id] && state.items[id].quantity > 0)
        state.items[id] = {
          ...state.items[id],
          quantity: newDecrement,
        };
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getProductsParsedInArray = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items)
);

export const getTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0;
    for (const id in items) {
      numItems += items[id].quantity;
    }

    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let total = 0;
    for (const id in items) {
      total += items[id].price_range.maximum_price.final_price.value;
    }
    return total;
  }
);

export const getProductById = (id: number) =>
  createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
      if (items[id]) return items[id];

      return null;
    }
  );


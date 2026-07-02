import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: { [productId: number]: number };
  totalItems: number;
}

const initialState: CartState = {
  items: {},
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity: (state, action: PayloadAction<{ id: number; delta: number }>) => {
      const { id, delta } = action.payload;
      const currentQty = state.items[id] || 0;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        delete state.items[id];
      } else {
        state.items[id] = newQty;
      }

      // Recalculate total items
      state.totalItems = Object.values(state.items).reduce((sum, qty) => sum + qty, 0);
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
    }
  },
});

export const { updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;